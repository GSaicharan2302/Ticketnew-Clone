package com.example.theatre.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Seat Not Found",code = HttpStatus.NOT_FOUND)
public class SeatNotFoundException extends Exception {
}
