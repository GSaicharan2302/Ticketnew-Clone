package com.example.movieAppCustomer.service;

import com.example.movieAppCustomer.model.Customer;
import com.example.movieAppCustomer.model.Review;
import com.example.movieAppCustomer.repository.CustomerRepository;
import com.example.movieAppCustomer.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public Review addReview(Review review,String emailID) {
        Customer tempCustomer=customerRepository.findById(emailID).get();
        review.setReviewerName(tempCustomer.getCustomername());
        review.setReviewerEmail(tempCustomer.getEmailID());
        Random random=new Random();
        int tmp=random.nextInt(1000,9999999);
        String temp="#"+tmp;
        review.setReviewID(temp);
        return reviewRepository.insert(review);
    }

    @Override
    public Review modifyReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByMovieID(String movieID) {
        return reviewRepository.getReviewsByMovieID(movieID);
    }
}
