package com.example.movieAppAuth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    private String emailID;
    private String role;
    private String status;
}
