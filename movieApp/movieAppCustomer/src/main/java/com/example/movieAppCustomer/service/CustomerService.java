package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.exception.CustomerAlreadyExistsException;
import com.example.movieAppCustomer.exception.CustomerNotFoundException;
import com.example.movieAppCustomer.model.Customer;
import com.example.movieAppCustomer.model.Order;

public interface CustomerService {
    Customer saveCustomer(Customer customer) throws CustomerAlreadyExistsException;
    Customer findCustomerByID(String emailID) throws CustomerNotFoundException;

}
