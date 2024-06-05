package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Movie {
    @Id
    private String movieID;
    private String movieName;
    private String synopsis;
    private List<String> cast;
    private List<String> languages;
    private List<String> genre;
    private String filmRating;

    private List<MovieTheatre> theatres;
    private List<String> city;
    private String duration;
    private int rating;
    private String status;

}
