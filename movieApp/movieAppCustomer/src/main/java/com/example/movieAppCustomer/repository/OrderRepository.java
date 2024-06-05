package com.example.movieAppCustomer.repository;

import com.example.movieAppCustomer.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {
    @Query(value = "{emailID:{$eq:?0}}")
    List<Order> getOrdersByCustomerID(String emailID);
    @Query(value = "{theatreID:{$eq:?0}}")
    List<Order> getOrdersByTheatreID(String theatreID);
}
