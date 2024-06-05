package com.example.movieAppCustomer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Customer already exists",code = HttpStatus.CONFLICT)
public class CustomerAlreadyExistsException extends Exception{

}
