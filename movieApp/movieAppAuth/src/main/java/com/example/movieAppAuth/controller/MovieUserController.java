package com.example.movieAppAuth.controller;

import com.example.movieAppAuth.domain.LoginData;
import com.example.movieAppAuth.domain.User;
import com.example.movieAppAuth.exception.OTPMismatchException;
import com.example.movieAppAuth.exception.UserNotFoundException;
import com.example.movieAppAuth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movie/auth")
public class MovieUserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user){
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginData loginData) throws OTPMismatchException {
        return new ResponseEntity<>(userService.login(loginData.getOtp(), loginData.getEmailID()),HttpStatus.OK);
    }
    @PostMapping("/getOTP")
    public ResponseEntity<?> getOTP(@RequestBody User user) throws UserNotFoundException {
        return new ResponseEntity<>(userService.getOTP(user.getEmailID()),HttpStatus.OK);
    }

}
