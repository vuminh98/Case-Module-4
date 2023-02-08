package com.example.comercial.repository.store;

import com.example.comercial.model.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    Iterable<Product> findAllByStoreId(Long id);

    Page<Product> findAllByNameContaining(String name, Pageable pageable);

    Page<Product> findAllByPriceBetween(double price1,double price2, Pageable pageable);

    Page<Product> findAllByCategory_Id(Long id, Pageable pageable);

}
