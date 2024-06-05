package com.example.theatre.service;

import com.example.theatre.domain.TheatreDTO;
import org.apache.catalina.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "movieAppAuth",url = "localhost:8025")
public interface TheatreProxy {
    @PostMapping("/movie/auth/register")
    ResponseEntity<?> sendTheatreDTO(@RequestBody TheatreDTO theatreDTO);
}
