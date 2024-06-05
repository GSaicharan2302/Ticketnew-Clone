package com.example.movieAppCustomer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    private String reviewID;
    private String reviewerName;
    private String reviewerEmail;
    private String review;
    private String movieID;
}
