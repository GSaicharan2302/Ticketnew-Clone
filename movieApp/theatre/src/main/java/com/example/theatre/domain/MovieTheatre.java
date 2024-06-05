package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieTheatre {
    String name;
    List<String> languages;
    List<String> format;
    String city;
    List<ShowScreen> showtimeList;
    String deadline;
}
