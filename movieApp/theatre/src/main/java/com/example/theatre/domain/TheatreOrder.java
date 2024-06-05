package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class TheatreOrder {
    private String orderID;
    private String theatreID;
    private String emailID;
    private String customerName;
    private List<String> seats;
    private String screen;
    private Date date;
    private String showTime;
}
