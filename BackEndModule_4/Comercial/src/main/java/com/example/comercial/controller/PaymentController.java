package com.example.comercial.controller;


import com.example.comercial.model.cart.HistoryBuy;
import com.example.comercial.model.cart.Payment;
import com.example.comercial.model.product.Review;
import com.example.comercial.service.cart.HistoryBuyService;
import com.example.comercial.service.cart.PaymentService;
import com.example.comercial.service.cart.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private HistoryBuyService historyBuyService;
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{userId}")
    public ResponseEntity<Iterable<Payment>> findAllByUser(@PathVariable Long userId){
        return new ResponseEntity<>(paymentService.findAllByUserId(userId), HttpStatus.OK);
    }
    @GetMapping("/payment_details/{id}")
    public ResponseEntity<Iterable<HistoryBuy>> findAllHistoryBuy(@PathVariable Long id){
        return new ResponseEntity<>(historyBuyService.findAllByPayment(id),HttpStatus.OK);
    }
    @PostMapping("/reviews")
    public ResponseEntity<Review> reviewProduct(@RequestBody Review review){
        try{
            reviewService.saveReviews(review);
            return new ResponseEntity<>(new Review(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
