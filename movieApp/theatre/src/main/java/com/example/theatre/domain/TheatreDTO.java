package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TheatreDTO {
    private String emailID;
    private String role;
    private String status;
}
