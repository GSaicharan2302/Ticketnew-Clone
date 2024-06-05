package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.Order;

import java.util.List;

public interface OrderService {
    Order addOrder(Order order,String emailID);
    List<Order> getOrdersByCustomerID(String emailID);
    List<Order> getOrdersByTheatreID(String theatreID);
}
