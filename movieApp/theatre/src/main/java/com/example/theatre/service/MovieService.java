package com.example.theatre.service;

import com.example.theatre.domain.*;
import com.example.theatre.exception.MovieAlreadyExistsException;
import com.example.theatre.exception.TheatreAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;

import java.util.List;

public interface MovieService {
    Movie addMovie(Movie movie) throws MovieAlreadyExistsException;
    Movie addTheatre(MovieTheatre movieTheatre,String movieID);
    Movie getMovieByID(String movieID);
    List<Movie> getMoviesByCity(String city);
    List<Movie> getMoviesByCityAndLanguage(String city,String language);
    List<Movie> getMoviesByCityAndGenre(String city,String genre);
    List<Movie> getMoviesByCityAndFormat(String city,String format);
    Movie updateMovieStatus(String movieID,String status);
    List<Movie> getMoviesByCityAndUpcoming(String city);
    List<Theatre> getTheatresByMovieID(String movieID,String city);
    List<Theatre> getTheatresByMovieIDAndFormat(String movieID,String format,String city) throws TheatreNotFoundException;
    List<Theatre> getTheatresByMovieIDAndLanguage(String movieID,String language,String city) throws TheatreNotFoundException;
    Movie addShowtime(ShowScreen showScreen, String movieID, String theatreID);
    Movie deleteShowtime(ShowScreen showScreen,String movieID,String theatreID);
    int getTicketPrice(ScreenDateTime screenDateTime,String theatreID,String movieID,String format);
}
