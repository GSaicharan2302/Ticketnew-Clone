package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "movieAppAuth",url = "localhost:8025")
public interface LoginProxy {
    @PostMapping("/movie/auth/register")
    ResponseEntity<?> sendLoginDTO(@RequestBody UserDTO userDTO);
}
