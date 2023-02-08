package com.example.comercial.repository.store;

import com.example.comercial.model.product.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStoreRepository extends JpaRepository<Store, Long> {
    Page<Store> findAllByNameStoreContaining(String name, Pageable pageable);
}
