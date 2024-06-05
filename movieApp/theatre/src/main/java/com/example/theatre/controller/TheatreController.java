package com.example.theatre.controller;

import com.example.theatre.domain.ScreenDateTime;
import com.example.theatre.domain.Seat;
import com.example.theatre.domain.Theatre;
import com.example.theatre.domain.TheatreOrder;
import com.example.theatre.exception.TheatreAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;
import com.example.theatre.service.MovieService;
import com.example.theatre.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
@RequestMapping("/theatre")
public class TheatreController {
    @Autowired
    private TheatreService theatreService;

    @PostMapping("/addTheatre")
    public ResponseEntity<?> addTheatre(@RequestBody Theatre theatre) throws TheatreAlreadyExistsException {
        theatre.setStatus("active");
        theatre.setOrders(new ArrayList<>());
        return new ResponseEntity<>(theatreService.addTheatre(theatre), HttpStatus.CREATED);
    }
    @GetMapping("/getTheatresByCity/{city}")
    public ResponseEntity<?> getTheatresByCity(@PathVariable String city){
        return new ResponseEntity<>(theatreService.getTheatresByCity(city),HttpStatus.OK);
    }
    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody TheatreOrder order) throws TheatreNotFoundException {
        return new ResponseEntity<>(theatreService.addOrder(order, order.getTheatreID()),HttpStatus.CREATED);
    }
    @GetMapping("/getOrdersByTheatreID/{theatreID}")
    public ResponseEntity<?> getOrdersByTheatreID(@PathVariable String theatreID) throws TheatreNotFoundException {
        theatreID="#"+theatreID;
        return new ResponseEntity<>(theatreService.getOrdersByTheatreID(theatreID),HttpStatus.OK);
    }
    @PostMapping("/getSeatsByDateAndShowtimeAndScreen/{theatreID}")
    public ResponseEntity<?> getSeatsByDateAndShowtimeAndScreen(@PathVariable String theatreID, @RequestBody ScreenDateTime screenDateTime) throws Exception {
        theatreID="#"+theatreID;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date dateFormatType = dateFormat.parse(screenDateTime.getDate());
            System.out.println(screenDateTime.getDate());
            return new ResponseEntity<>(theatreService.getOrdersByDateAndTimeAndScreen(dateFormatType, screenDateTime.getShowTime(), screenDateTime.getScreen(), theatreID),HttpStatus.OK);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new Exception();
        }

    }

    @GetMapping("/getTheatreByID/{theatreID}")
    public ResponseEntity<?> getTheatreByID(@PathVariable String theatreID) throws TheatreNotFoundException {
        theatreID="#"+theatreID;
        return new ResponseEntity<>(theatreService.getTheatresByID(theatreID),HttpStatus.OK);
    }
}
