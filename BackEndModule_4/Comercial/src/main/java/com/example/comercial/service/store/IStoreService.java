package com.example.comercial.service.store;

import com.example.comercial.model.cart.HistoryBuy;
import com.example.comercial.model.cart.Payment;
import com.example.comercial.model.product.Store;
import com.example.comercial.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStoreService extends IGeneralService<Store> {
    Page<Store> findAllByNameStoreContaining(String name, Pageable pageable);
    public Iterable<HistoryBuy> paymentDetails(Long paymentId);
    public Iterable<Payment> paymentsBySearch(String key, String value, String storeId);
    public Iterable<Payment> paymentByOneUser(Long userId,Long storeId);
    public Iterable<Payment> paymentByStore(Long storeId);
}
