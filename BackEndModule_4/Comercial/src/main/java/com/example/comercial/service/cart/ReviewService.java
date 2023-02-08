package com.example.comercial.service.cart;

import com.example.comercial.model.product.Review;
import com.example.comercial.repository.IReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private IReviewRepository reviewRepository;
    public void saveReviews(Review review){
        reviewRepository.save(review);
    }
}
