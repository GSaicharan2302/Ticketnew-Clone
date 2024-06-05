package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.Review;

import java.util.List;

public interface ReviewService {
    Review addReview(Review review,String emailID);
    Review modifyReview(Review review);
    List<Review> getReviewsByMovieID(String movieID);
}
