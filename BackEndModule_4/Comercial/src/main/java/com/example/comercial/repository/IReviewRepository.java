package com.example.comercial.repository;


import com.example.comercial.model.product.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReviewRepository extends JpaRepository<Review,Long> {
}
