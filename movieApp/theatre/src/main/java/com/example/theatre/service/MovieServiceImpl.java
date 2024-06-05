package com.example.theatre.service;

import com.example.theatre.domain.*;
import com.example.theatre.exception.MovieAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;
import com.example.theatre.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

@Service
public class MovieServiceImpl implements MovieService{
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private TheatreService theatreService;
    @Override
    public Movie addMovie(Movie movie) throws MovieAlreadyExistsException {
        try{
            Random random=new Random();
            int temp=random.nextInt(1000,9999999);
            String tempID="#"+temp;
            movie.setMovieID(tempID);
            movie.setTheatres(new ArrayList<>());
            return movieRepository.insert(movie);
        }
        catch(DuplicateKeyException duplicateKeyException){
            throw new MovieAlreadyExistsException();
        }
    }

    @Override
    public Movie addTheatre(MovieTheatre movieTheatre,String movieID) {
            Movie movie=movieRepository.findById(movieID).get();
            List<MovieTheatre> movieTheatreList=movie.getTheatres();
            movieTheatreList.add(movieTheatre);
            movie.setTheatres(movieTheatreList);
            return movieRepository.save(movie);
    }

    @Override
    public Movie getMovieByID(String movieID) {
        return movieRepository.findById(movieID).get();
    }


    @Override
    public List<Movie> getMoviesByCity(String city) {
        return movieRepository.getMoviesByCity(city);
    }

    @Override
    public List<Movie> getMoviesByCityAndLanguage(String city, String language) {
        List<Movie> movieList=movieRepository.getMoviesByCity(city);
        Iterator<Movie> movieIterator=movieList.iterator();
        List<Movie> filteredMovieList=new ArrayList<>();
        boolean isExist=false;
        while(movieIterator.hasNext()){
            Movie tempMovie=movieIterator.next();
            List<MovieTheatre> tempMovieTheatreList=tempMovie.getTheatres();
            Iterator<MovieTheatre> movieTheatreIterator=tempMovieTheatreList.iterator();
            while(movieTheatreIterator.hasNext()){
                MovieTheatre tempMovieTheatre=movieTheatreIterator.next();
                if(tempMovieTheatre.getLanguages().contains(language) && tempMovieTheatre.getCity().equals(city)){
                    isExist=true;
                    break;
                }
            }
            if(isExist){
                filteredMovieList.add(tempMovie);
                isExist=false;
            }
        }
        return filteredMovieList;
    }

    @Override
    public List<Movie> getMoviesByCityAndGenre(String city, String genre) {
        List<Movie> movieList=movieRepository.getMoviesByCity(city);
        List<Movie> filteredMovieList=new ArrayList<>();
        Iterator<Movie> movieIterator=movieList.iterator();
        while(movieIterator.hasNext()){
            Movie tempMovie=movieIterator.next();
            if(tempMovie.getGenre().contains(genre)){
                filteredMovieList.add(tempMovie);
            }
        }
        return filteredMovieList;
    }

    @Override
    public List<Movie> getMoviesByCityAndFormat(String city, String format) {
        List<Movie> movieList=movieRepository.getMoviesByCity(city);
        List<Movie> filteredMovieList=new ArrayList<>();
        boolean isExist=false;
        Iterator<Movie> movieIterator=movieList.iterator();
        while (movieIterator.hasNext()){
            Movie tempMovie=movieIterator.next();
            Iterator<MovieTheatre> movieTheatreIterator=tempMovie.getTheatres().iterator();
            while(movieTheatreIterator.hasNext()){
                MovieTheatre tempMovieTheatre=movieTheatreIterator.next();
                if (tempMovieTheatre.getFormat().contains(format)){
                    isExist=true;
                }
            }
            if(isExist){
                filteredMovieList.add(tempMovie);
                isExist=false;
            }
        }
        return filteredMovieList;
    }

    @Override
    public Movie updateMovieStatus(String movieID,String status) {
        Movie tempMovie=movieRepository.findById(movieID).get();
        tempMovie.setStatus(status);
        return movieRepository.save(tempMovie);
    }

    @Override
    public List<Movie> getMoviesByCityAndUpcoming(String city) {
            return this.movieRepository.getMoviesByCityAndUpcoming(city);
    }

    @Override
    public List<Theatre> getTheatresByMovieID(String movieID,String city) {
        Movie tempMovie=movieRepository.findById(movieID).get();
        List<MovieTheatre> movietheatreList=tempMovie.getTheatres();
        List<String> theatreIDList=new ArrayList<>();
        Iterator<MovieTheatre> iterator=movietheatreList.iterator();
        while(iterator.hasNext()){
            MovieTheatre tempMovieTheatre=iterator.next();
            theatreIDList.add(tempMovieTheatre.getName());
        }
        List<Theatre> theatreList=theatreService.getTheatresByCity(city);
        List<Theatre> resultTheatreList=new ArrayList<>();
        Iterator<Theatre> i=theatreList.iterator();
        while(i.hasNext()){
            Theatre tempTheatre=i.next();
            if(theatreIDList.contains(tempTheatre.getTheatreID())){
                resultTheatreList.add(tempTheatre);
            }
        }
        return resultTheatreList;

    }

    @Override
    public List<Theatre> getTheatresByMovieIDAndFormat(String movieID, String format,String city) throws TheatreNotFoundException {
        Movie movie=movieRepository.findById(movieID).get();
        List<MovieTheatre> movieTheatreList=movie.getTheatres();
        Iterator<MovieTheatre> iterator=movieTheatreList.iterator();
        List<Theatre> theatreList=new ArrayList<>();
        List<String> theatreNameList=new ArrayList<>();
        while(iterator.hasNext()){
            MovieTheatre tempMovieTheatre=iterator.next();
            if(tempMovieTheatre.getFormat().contains(format) && tempMovieTheatre.getCity().equals(city)){
                theatreNameList.add(tempMovieTheatre.getName());
            }
        }
        for(String s:theatreNameList){
            Theatre temp=theatreService.getTheatresByID(s);
            theatreList.add(temp);
        }
        return theatreList;
    }

    @Override
    public List<Theatre> getTheatresByMovieIDAndLanguage(String movieID, String language, String city) throws TheatreNotFoundException {
        Movie movie=movieRepository.findById(movieID).get();
        List<MovieTheatre> movieTheatreList=movie.getTheatres();
        List<String> theatreIDList=new ArrayList<>();
        List<Theatre> theatreList=new ArrayList<>();
        Iterator<MovieTheatre> iterator=movieTheatreList.iterator();
        while(iterator.hasNext()){
            MovieTheatre tempmovieTheatre=iterator.next();
            if(tempmovieTheatre.getLanguages().contains(language) && tempmovieTheatre.getCity().equals(city)){
                theatreIDList.add(tempmovieTheatre.getName());
            }
        }
        for (String s:theatreIDList){
            Theatre tempTheatre=theatreService.getTheatresByID(s);
            theatreList.add(tempTheatre);
        }
        return theatreList;
    }
    public int getTicketPrice(ScreenDateTime screenDateTime,String theatreID,String movieID,String format){
        int price=0;
        Movie movie=movieRepository.findById(movieID).get();
        List<MovieTheatre> movieTheatre=movie.getTheatres();
        Iterator<MovieTheatre> movieTheatreIterator=movieTheatre.iterator();
        while(movieTheatreIterator.hasNext()){
            MovieTheatre individualMovieTheatre=movieTheatreIterator.next();
            if(individualMovieTheatre.getName().equals(theatreID)){
                List<ShowScreen> showScreenList=individualMovieTheatre.getShowtimeList();
                Iterator<ShowScreen> showScreenIterator= showScreenList.iterator();
                while(showScreenIterator.hasNext()){
                    ShowScreen showScreen=showScreenIterator.next();
                    if(showScreen.getScreen().equals(screenDateTime.getScreen()) && showScreen.getShowTime()
                            .equals(screenDateTime.getShowTime()) && showScreen.getFormat().equals(format) ){
                            price=showScreen.getAmount();
                            break;
                    }
                }
                break;
            }
        }
        return price;
    }

    @Override
    public Movie addShowtime(ShowScreen show, String movieID, String theatreID) {
        Movie movie=movieRepository.findById(movieID).get();
        System.out.println(movie);
        List<MovieTheatre> tempTheatres=movie.getTheatres();
        Iterator<MovieTheatre> theatreIterator=tempTheatres.iterator();
        while(theatreIterator.hasNext()){
            MovieTheatre movieTheatre=theatreIterator.next();
            if(movieTheatre.getName().equals(theatreID)){
                tempTheatres.remove(movieTheatre);
                List<ShowScreen> showScreenList=movieTheatre.getShowtimeList();
                showScreenList.add(show);
                movieTheatre.setShowtimeList(showScreenList);
                tempTheatres.add(movieTheatre);
                break;
            }
        }
        movie.setTheatres(tempTheatres);
        return movieRepository.save(movie);
    }

    @Override
    public Movie deleteShowtime(ShowScreen showScreen, String movieID, String theatreID) {
        Movie movie=movieRepository.findById(movieID).get();
        List<MovieTheatre> theatres=movie.getTheatres();
        Iterator<MovieTheatre> theatreIterator=theatres.iterator();
        while (theatreIterator.hasNext()){
            MovieTheatre movieTheatre=theatreIterator.next();
            if (movieTheatre.getName().equals(theatreID)){
                theatres.remove(movieTheatre);
                List<ShowScreen> showScreenList=movieTheatre.getShowtimeList();
                showScreenList.remove(showScreen);
                movieTheatre.setShowtimeList(showScreenList);
                theatres.add(movieTheatre);
                break;
            }

        }
        movie.setTheatres(theatres);
        return movieRepository.save(movie);
    }


}
