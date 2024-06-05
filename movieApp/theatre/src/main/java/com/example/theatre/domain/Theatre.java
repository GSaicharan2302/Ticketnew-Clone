package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Theatre {
    @Id
    private String theatreID;
    private String theatreName;
    private Address theatreAddress;
    private String theatreEmail;
    private String theatreContactNo;
    private String status;
    private List<TheatreOrder> orders;
}
