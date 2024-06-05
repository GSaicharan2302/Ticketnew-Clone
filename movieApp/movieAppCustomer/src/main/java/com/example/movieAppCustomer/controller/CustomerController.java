package com.example.movieAppCustomer.controller;

import com.example.movieAppCustomer.exception.CustomerAlreadyExistsException;
import com.example.movieAppCustomer.exception.CustomerNotFoundException;
import com.example.movieAppCustomer.model.Customer;
import com.example.movieAppCustomer.model.Order;
import com.example.movieAppCustomer.model.Review;
import com.example.movieAppCustomer.service.CustomerService;
import com.example.movieAppCustomer.service.OrderService;
import com.example.movieAppCustomer.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ReviewService reviewService;
    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws CustomerAlreadyExistsException {
        return new ResponseEntity<>(customerService.saveCustomer(customer), HttpStatus.CREATED);
    }
    @GetMapping("/getCustomerByID")
    public ResponseEntity<?> getCustomerByID(HttpServletRequest request) throws CustomerNotFoundException {
        String emailID=(String) request.getAttribute("EmailID");
        System.out.println(emailID);
        return new ResponseEntity<>(customerService.findCustomerByID(emailID),HttpStatus.OK);
    }
    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody Order order,HttpServletRequest request){
        String emailID=(String) request.getAttribute("EmailID");
        System.out.println("Order date"+order.getOrderDate());
        Calendar calendar=Calendar.getInstance();
        calendar.setTime(order.getOrderDate());
        int year=calendar.get(Calendar.YEAR);
        int month=calendar.get(Calendar.MONTH)+1;
        int day=calendar.get(Calendar.DAY_OF_MONTH);
        String dateString=year+"-"+month+"-"+day;
        System.out.println(dateString);
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        try{
            Date dateFormatType=simpleDateFormat.parse(dateString);
            order.setOrderDate(dateFormatType);
            return new ResponseEntity<>(orderService.addOrder(order,emailID),HttpStatus.OK);

        }
         catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody Review review,HttpServletRequest request){
        String emailID=(String) request.getAttribute("EmailID");
        return new ResponseEntity<>(reviewService.addReview(review,emailID),HttpStatus.CREATED);
    }
    @PostMapping("/modifyReview")
    public ResponseEntity<?> modifyReview(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.modifyReview(review),HttpStatus.OK);
    }
    @GetMapping("/movieReview/{movieID}")
    public ResponseEntity<?> getMovieReviewByMovieID(@PathVariable String movieID){
        String tempID="#"+movieID;
        return new ResponseEntity<>(reviewService.getReviewsByMovieID(tempID),HttpStatus.OK);
    }
    @GetMapping("/getOrdersByCustomerID/{emailID}")
    public ResponseEntity<?> getOrdersByCustomerID(@PathVariable String emailID){
        return new ResponseEntity<>(orderService.getOrdersByCustomerID(emailID),HttpStatus.OK);
    }
    @GetMapping("/getOrdersByTheatreID/{theatreID}")
    public ResponseEntity<?> getOrdersByTheatreID(@PathVariable String theatreID){
        theatreID="#"+theatreID;
        return new ResponseEntity<>(orderService.getOrdersByTheatreID(theatreID),HttpStatus.OK);
    }

}
