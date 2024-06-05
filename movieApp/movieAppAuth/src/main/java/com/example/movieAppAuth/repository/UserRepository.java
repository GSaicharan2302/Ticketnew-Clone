package com.example.movieAppAuth.repository;

import com.example.movieAppAuth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
