package com.example.comercial.repository.cart;

import com.example.comercial.model.cart.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment,Long> {
    @Transactional
    Optional<Payment> findByUserIdAndStoreIdAndStatus(Long userId, Long storeId,boolean status);
    Iterable<Payment> findAllByUserId(Long userId);
    Iterable<Payment> findAllByDateCreatedAndStoreId(LocalDate dateCreated,Long id);
    Iterable<Payment> findAllByUserPhoneAndStoreId(String phone,Long storeId);
    Iterable<Payment> findAllByTotalPriceBetween(Double totalPrice, Double totalPrice2);
    Iterable<Payment> findAllByStoreIdAndUserId(Long storeId, Long userId);
    Iterable<Payment> findAllByStoreId(Long storeId);
}
