package com.example.theatre.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Theatre already exists",code = HttpStatus.CONFLICT)
public class MovieAlreadyExistsException extends Exception{
}
