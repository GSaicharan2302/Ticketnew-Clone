package com.example.movieAppCustomer.repository;

import com.example.movieAppCustomer.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review,String> {
    @Query(value="{movieID:{$eq:?0}}")
    List<Review> getReviewsByMovieID(String movieID);
}
