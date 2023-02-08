package com.example.comercial.repository.cart;

import com.example.comercial.model.cart.HistoryBuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHistoryBuyRepository extends JpaRepository<HistoryBuy, Long> {
    Iterable<HistoryBuy> findAllByPaymentId(long id);
}
