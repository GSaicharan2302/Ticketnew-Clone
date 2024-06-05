package com.example.movieAppCustomer.repository;

import com.example.movieAppCustomer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer,String> {

}
