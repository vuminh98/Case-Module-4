package com.example.comercial.service.store;

import com.example.comercial.model.product.Product;
import com.example.comercial.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService extends IGeneralService<Product> {
    Iterable<Product> findAllByStoreId(Long id);

    Page<Product> findAllByNameContaining (String name, Pageable pageable);

    Page<Product> findAllByPriceBetween(String price1,String price2, Pageable pageable);

    Page<Product> findAllByCategory(String category, Pageable pageable);

    Page<Product> findAllByCategory_Id(String id, Pageable pageable);
}
