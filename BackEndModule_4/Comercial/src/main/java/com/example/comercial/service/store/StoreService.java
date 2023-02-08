package com.example.comercial.service.store;

import com.example.comercial.model.cart.HistoryBuy;
import com.example.comercial.model.cart.Payment;
import com.example.comercial.model.login.User;
import com.example.comercial.model.product.Store;
import com.example.comercial.repository.cart.IHistoryBuyRepository;
import com.example.comercial.repository.cart.IPaymentRepository;
import com.example.comercial.repository.login.IUserRepository;
import com.example.comercial.repository.store.IStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StoreService implements IStoreService {
    @Autowired
    private IStoreRepository storeRepository;
    @Autowired
    private IHistoryBuyRepository historyBuyRepository;
    @Autowired
    private IPaymentRepository paymentRepository;
    @Autowired
    private IUserRepository userRepository;

    @Override
    public Iterable<Store> findAll() {
        return storeRepository.findAll();
    }

    @Override
    public Optional<Store> findById(Long id) {
        return storeRepository.findById(id);
    }

    @Override
    public Iterable<Store> findByName(String name) {
        return null;
    }

    @Override
    public Page<Store> findAllPage(Pageable pageable) {
        return null;
    }

    @Override
    public Store save(Store store) {
        return storeRepository.save(store);
    }


    @Override
    public boolean remove(Long id) {
        try {
            storeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Page<Store> findAllByNameStoreContaining(String name, Pageable pageable) {
        return storeRepository.findAllByNameStoreContaining(name, pageable);
    }

    public Iterable<HistoryBuy> paymentDetails(Long paymentId){
        List<HistoryBuy> historyBuys = (List<HistoryBuy>) historyBuyRepository.findAllByPaymentId(paymentId);
        if(historyBuys.size()>0){
            return historyBuys;
        }else {
            return  null;
        }
    }
    public Iterable<Payment> paymentsBySearch(String key, String value, String storeId){
        Iterable<Payment> payments = paymentRepository.findAllByStoreId(Long.parseLong(storeId));
        switch (key) {
            case "phone":
                Optional<User> user = userRepository.findByPhone(value);
                if (user.isPresent()) {
                    payments = paymentRepository.findAllByUserPhoneAndStoreId(value, Long.parseLong(storeId));
                }
                break;
            case "totalPrice":
                payments = paymentRepository.findAllByTotalPriceBetween(Double.parseDouble(value) - 50, Double.parseDouble(value) + 50);
                break;
            case "dateCreated":
                payments = paymentRepository.findAllByDateCreatedAndStoreId(LocalDate.parse(value), Long.parseLong(storeId));
                break;
        }
        return payments;

    }
    public Iterable<Payment> paymentByOneUser(Long userId,Long storeId){
        List<Payment> payments = (List<Payment>) paymentRepository.findAllByStoreIdAndUserId(storeId, userId);
        if(payments.size()>0){
            return payments;
        }else {
            return  null;
        }
    }
    public Iterable<Payment> paymentByStore(Long storeId){
        Optional<Store> store = storeRepository.findById(storeId);
        if (store.isPresent()) {
            return paymentRepository.findAllByStoreId(storeId);
        }else {
            return null;
        }
    }

}
