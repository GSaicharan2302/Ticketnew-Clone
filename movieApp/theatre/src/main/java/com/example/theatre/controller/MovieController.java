package com.example.theatre.controller;

import com.example.theatre.domain.Movie;
import com.example.theatre.domain.MovieTheatre;
import com.example.theatre.domain.ScreenDateTime;
import com.example.theatre.domain.ShowScreen;
import com.example.theatre.exception.MovieAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;
import com.example.theatre.service.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/movieControl")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @PostMapping("/addMovie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) throws MovieAlreadyExistsException {
        movie.setStatus("active");
        return new ResponseEntity<>(movieService.addMovie(movie), HttpStatus.CREATED);
    }
    @GetMapping("/getMovieByID/{movieID}")
    public ResponseEntity<?> getMovieByID(@PathVariable String movieID){
        movieID="#"+movieID;
        return new ResponseEntity<>(movieService.getMovieByID(movieID),HttpStatus.OK);
    }
    @PostMapping("/addTheatre/{movieID}")
    public ResponseEntity<?> addTheatre(@RequestBody MovieTheatre movieTheatre,@PathVariable String movieID){
        movieID="#"+movieID;
        return new ResponseEntity<>(movieService.addTheatre(movieTheatre,movieID),HttpStatus.OK);
    }
    @GetMapping("/getMoviesByCity/{city}")
    public ResponseEntity<?> getMoviesByCity(@PathVariable String city){
        return new ResponseEntity<>(movieService.getMoviesByCity(city),HttpStatus.OK);
    }
    @GetMapping("/getMoviesByCityAndLanguages/{city}/{language}")
    public ResponseEntity<?> getMoviesByCityAndLanguages(@PathVariable String city,@PathVariable String language){
        return new ResponseEntity<>(movieService.getMoviesByCityAndLanguage(city, language),HttpStatus.OK);
    }
    @GetMapping("/getMoviesByCityAndGenre/{city}/{genre}")
    public ResponseEntity<?> getMoviesByCityAndGenre(@PathVariable String city,@PathVariable String genre){
        return new ResponseEntity<>(movieService.getMoviesByCityAndGenre(city, genre),HttpStatus.OK);
    }
    @GetMapping("/getMoviesByCityAndFormat/{city}/{format}")
    public ResponseEntity<?> getMoviesByCityAndFormat(@PathVariable String city,@PathVariable String format){
        return new ResponseEntity<>(movieService.getMoviesByCityAndFormat(city, format),HttpStatus.OK);
    }
    @PutMapping("/updateMovieStatus/{movieID}/{status}")
    public ResponseEntity<?> updateMovieStatus(@PathVariable String movieID,@PathVariable String status){
        movieID="#"+movieID;
        return new ResponseEntity<>(movieService.updateMovieStatus(movieID,status),HttpStatus.OK);
    }
    @GetMapping("/getTheatresByMovieID/{movieID}/{city}")
    public ResponseEntity<?> getTheatresByMovieID(@PathVariable String movieID,@PathVariable String city){
        movieID="#"+movieID;
        return new ResponseEntity<>(movieService.getTheatresByMovieID(movieID,city),HttpStatus.OK);
    }
    @GetMapping("/getTheatresByMovieIDAndFormat/{movieID}/{format}/{city}")
    public ResponseEntity<?> getTheatresByMovieIDAndFormat(@PathVariable String movieID,@PathVariable String format,@PathVariable String city) throws TheatreNotFoundException {
       movieID="#"+movieID;
        return new ResponseEntity<>(movieService.getTheatresByMovieIDAndFormat(movieID,format,city),HttpStatus.OK);
    }
    @GetMapping("/getTheatresByMovieIDAndLanguage/{movieID}/{language}/{city}")
    public ResponseEntity<?> getTheatresByMovieIDAndLanguage(@PathVariable String movieID,@PathVariable String language
               ,@PathVariable String city) throws TheatreNotFoundException {
        movieID="#"+movieID;
        return new ResponseEntity<>(movieService.getTheatresByMovieIDAndLanguage(movieID,language,city),HttpStatus.OK);
    }
    @GetMapping("/getMoviesByCityAndUpcoming/{city}")
    public ResponseEntity<?> getMoviesByCityAndUpcoming(@PathVariable String city){
        return new ResponseEntity<>(movieService.getMoviesByCityAndUpcoming(city),HttpStatus.OK);
    }
    @PostMapping("/addShowScreen/{movieID}/{theatreID}")
    public ResponseEntity<?> addShowScreen(@RequestBody ShowScreen showScreen,@PathVariable String movieID,@PathVariable String theatreID){
        movieID="#"+movieID;
        theatreID="#"+theatreID;
        return new ResponseEntity<>(movieService.addShowtime(showScreen,movieID,theatreID),HttpStatus.OK);
    }
    @DeleteMapping("/deleteShowScreen/{movieID}/{theatreID}")
    public ResponseEntity<?> deleteShowScreen(@RequestBody ShowScreen showScreen,@PathVariable String movieID,@PathVariable String theatreID){
        movieID="#"+movieID;
        theatreID="#"+theatreID;
        return new ResponseEntity<>(movieService.deleteShowtime(showScreen,movieID,theatreID),HttpStatus.OK);
    }
    @PostMapping("/getAmount/{theatreID}/{movieID}/{format}")
    public ResponseEntity<?> getAmount(@RequestBody ScreenDateTime screenDateTime,@PathVariable String
                          theatreID,@PathVariable String movieID,@PathVariable String format            ){
        movieID="#"+movieID;
        theatreID="#"+theatreID;
        return new ResponseEntity<>(movieService.getTicketPrice(screenDateTime,theatreID,movieID,format),HttpStatus.OK);
    }
}
