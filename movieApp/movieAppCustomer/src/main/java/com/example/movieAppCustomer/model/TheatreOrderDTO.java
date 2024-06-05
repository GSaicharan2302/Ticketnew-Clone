package com.example.movieAppCustomer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TheatreOrderDTO {
    private String theatreID;
    private String emailID;
    private String customerName;
    private List<String> seats;
    private String screen;
    private Date date;
    private String showTime;
}
