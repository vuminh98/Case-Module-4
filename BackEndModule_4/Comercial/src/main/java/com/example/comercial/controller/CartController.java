package com.example.comercial.controller;


import com.example.comercial.model.cart.Cart;
import com.example.comercial.model.cart.Payment;
import com.example.comercial.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Iterable<Cart>> findAll(){
        return new ResponseEntity<>(cartService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Cart>> findAllByUserId(@PathVariable long id){
        return new ResponseEntity<>(cartService.findAllByUserId(id), HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart){
        if (cartService.save(cart)){
            return new ResponseEntity<>(cart, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Cart> deleteCart(@RequestBody Cart cart){
        if (cartService.delete(cart)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    @DeleteMapping("/delete_all/{userId}")
    public ResponseEntity<Cart> deleteAllCart(@PathVariable("userId") long userId){
        if (cartService.deleteAll(userId)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    @PutMapping("/payment/{id}")
    private ResponseEntity<Payment> payment(@PathVariable("id") Long userId){
        try{
            if (cartService.payment(userId)){
                return new ResponseEntity<>(new Payment(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    @GetMapping("/assent/{paymentId}")
    public ResponseEntity<Payment> accept(@PathVariable("paymentId")Long paymentId){
        try{
            if (cartService.accept(paymentId)){
                return new ResponseEntity<>(new Payment(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    @GetMapping("/delete/{paymentId}")
    public ResponseEntity<Payment> deletePayment(@PathVariable("paymentId")Long paymentId){
        try{
            if (cartService.deletePayment(paymentId)){
                return new ResponseEntity<>(new Payment(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
