package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.TheatreOrderDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "theatre",url = "localhost:8030")
public interface OrderProxy {
    @PostMapping("/theatre/addOrder")
    ResponseEntity<?> addTheatreOrder( @RequestBody TheatreOrderDTO theatreOrderDTO);
}
