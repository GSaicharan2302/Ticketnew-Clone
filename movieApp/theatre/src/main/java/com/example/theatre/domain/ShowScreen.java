package com.example.theatre.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ShowScreen {
    private String showTime;
    private String screen;
    private String language;
    private int amount;
    private String format;
}
