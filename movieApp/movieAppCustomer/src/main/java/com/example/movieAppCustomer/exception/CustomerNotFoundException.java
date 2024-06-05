package com.example.movieAppCustomer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Customer Not Found",code = HttpStatus.NOT_FOUND)
public class CustomerNotFoundException extends Exception{
}
