package com.example.movieAppCustomer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String orderID;
    private List<String> seats;
    private int noOfSeats;
    private String screen;
    private String moviename;
    private String language;
    private String emailID;
    private String customername;
    private String theatreID;
    private String theatrename;
    private Date orderDate;
    private String time;
    private int amount;
    private String movieID;
}
