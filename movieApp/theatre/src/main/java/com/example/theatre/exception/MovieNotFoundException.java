package com.example.theatre.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Movie not found",code = HttpStatus.NOT_FOUND)
public class MovieNotFoundException extends Exception{
}
