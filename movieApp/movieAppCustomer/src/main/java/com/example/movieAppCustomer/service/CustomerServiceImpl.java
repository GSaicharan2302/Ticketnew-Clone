package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.exception.CustomerAlreadyExistsException;
import com.example.movieAppCustomer.exception.CustomerNotFoundException;
import com.example.movieAppCustomer.model.Customer;
import com.example.movieAppCustomer.model.UserDTO;
import com.example.movieAppCustomer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private LoginProxy loginProxy;
    @Override
    public Customer saveCustomer(Customer customer) throws CustomerAlreadyExistsException {
        try{
            UserDTO userDTO=new UserDTO(customer.getEmailID(),"customer","active");
            ResponseEntity resp=loginProxy.sendLoginDTO(userDTO);
            return customerRepository.insert(customer);
        }
        catch(DuplicateKeyException duplicateKeyException){
            throw new CustomerAlreadyExistsException();
        }
    }

    @Override
    public Customer findCustomerByID(String emailID) throws CustomerNotFoundException {
        if(customerRepository.findById(emailID).isPresent()){
            return customerRepository.findById(emailID).get();
        }
        else{
            throw new CustomerNotFoundException();
        }
    }



}
