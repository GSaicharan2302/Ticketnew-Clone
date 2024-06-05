package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.Customer;
import com.example.movieAppCustomer.model.Order;
import com.example.movieAppCustomer.model.TheatreOrderDTO;
import com.example.movieAppCustomer.repository.CustomerRepository;
import com.example.movieAppCustomer.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderProxy orderProxy;
    @Override
    public Order addOrder(Order order,String emailID) {
        Customer tempCustomer=customerRepository.findById(emailID).get();
        order.setEmailID(emailID);
        order.setCustomername(tempCustomer.getCustomername());
        Random rand=new Random();
        String tempID="#"+rand.nextInt(1000,1000000);
        order.setOrderID(tempID);
        order.setNoOfSeats(order.getSeats().size());
        TheatreOrderDTO theatreOrderDTO=new TheatreOrderDTO();

        theatreOrderDTO.setTheatreID(order.getTheatreID());
        theatreOrderDTO.setEmailID(order.getEmailID());
        theatreOrderDTO.setDate(order.getOrderDate());
        theatreOrderDTO.setSeats(order.getSeats());
        theatreOrderDTO.setScreen(order.getScreen());
        theatreOrderDTO.setCustomerName(order.getCustomername());
        theatreOrderDTO.setShowTime(order.getTime());
        ResponseEntity resp=orderProxy.addTheatreOrder(theatreOrderDTO);
        return orderRepository.insert(order);
    }

    @Override
    public List<Order> getOrdersByCustomerID(String emailID) {

        return orderRepository.getOrdersByCustomerID(emailID);
    }

    @Override
    public List<Order> getOrdersByTheatreID(String theatreID) {
        return orderRepository.getOrdersByTheatreID(theatreID);
    }

}
