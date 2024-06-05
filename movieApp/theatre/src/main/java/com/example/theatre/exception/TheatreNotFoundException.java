package com.example.theatre.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Theatre Not Found",code = HttpStatus.NOT_FOUND)
public class TheatreNotFoundException extends Exception{
}
