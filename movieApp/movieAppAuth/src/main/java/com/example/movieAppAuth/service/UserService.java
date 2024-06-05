package com.example.movieAppAuth.service;

import com.example.movieAppAuth.domain.User;
import com.example.movieAppAuth.exception.OTPMismatchException;
import com.example.movieAppAuth.exception.UserNotFoundException;

import java.util.Map;

public interface UserService {
    User createUser(User user);
    int getOTP(String userID) throws UserNotFoundException;
    Map<String,String> login(int otp,String userID) throws OTPMismatchException;
    boolean checkOTP(int otp);
}
