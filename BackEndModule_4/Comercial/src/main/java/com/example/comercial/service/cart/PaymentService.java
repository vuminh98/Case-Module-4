package com.example.comercial.service.cart;


import com.example.comercial.model.cart.Payment;
import com.example.comercial.model.product.Review;

import com.example.comercial.repository.IReviewRepository;
import com.example.comercial.repository.cart.IPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {
    @Autowired
    private IPaymentRepository paymentRepository;
    public Iterable<Payment> findAllByUserId(long userId) {
        return paymentRepository.findAllByUserId(userId);
    }

}
