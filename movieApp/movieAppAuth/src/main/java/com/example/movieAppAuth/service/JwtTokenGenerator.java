package com.example.movieAppAuth.service;

import com.example.movieAppAuth.domain.User;

import java.util.Map;

public interface JwtTokenGenerator {
    Map<String,String> generateToken(User user);
}
