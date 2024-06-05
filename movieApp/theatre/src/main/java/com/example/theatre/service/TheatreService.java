package com.example.theatre.service;

import com.example.theatre.domain.Seat;
import com.example.theatre.domain.Theatre;
import com.example.theatre.domain.TheatreOrder;
import com.example.theatre.exception.SeatNotFoundException;
import com.example.theatre.exception.TheatreAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;

import java.util.Date;
import java.util.List;

public interface TheatreService {
Theatre addTheatre(Theatre theatre) throws TheatreAlreadyExistsException;
List<Theatre> getTheatresByCity(String city);
Theatre getTheatresByID(String theatreID) throws TheatreNotFoundException;
Theatre addOrder(TheatreOrder order,String theatreID) throws TheatreNotFoundException;
List<TheatreOrder> getOrdersByTheatreID(String theatreID) throws TheatreNotFoundException;
List<String> getOrdersByDateAndTimeAndScreen(Date date,String showTime,String screen,String theatreID) throws TheatreNotFoundException;
}
