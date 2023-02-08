package com.example.comercial.service.cart;


import com.example.comercial.model.cart.HistoryBuy;
import com.example.comercial.model.product.Review;
import com.example.comercial.repository.cart.IHistoryBuyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryBuyService {
    @Autowired
    private IHistoryBuyRepository historyBuyRepository;

    public Iterable<HistoryBuy> findAllByPayment(Long paymentId) {
        return historyBuyRepository.findAllByPaymentId(paymentId);
    }

}
