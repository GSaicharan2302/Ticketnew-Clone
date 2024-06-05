package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScreenDateTime {
    String date;
    String showTime;
    String screen;
}
