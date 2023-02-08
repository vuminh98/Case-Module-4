package com.example.comercial.service.store;

import com.example.comercial.model.product.Product;
import com.example.comercial.repository.store.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Iterable<Product> findByName(String name) {
        return null;
    }

    @Override
    public Page<Product> findAllPage(Pageable pageable) {
        return null;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean remove(Long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Iterable<Product> findAllByStoreId(Long id) {
        return productRepository.findAllByStoreId(id);
    }

    @Override
    public Page<Product> findAllByNameContaining(String name, Pageable pageable) {
        return productRepository.findAllByNameContaining(name, pageable);
    }

    @Override
    public Page<Product> findAllByPriceBetween(String price1, String price2, Pageable pageable) {
        return productRepository.findAllByPriceBetween(Double.parseDouble(price1), Double.parseDouble(price2), pageable);

    }

    @Override
    public Page<Product> findAllByCategory(String category, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Product> findAllByCategory_Id(String id, Pageable pageable) {
        return productRepository.findAllByCategory_Id(Long.parseLong(id), pageable);
    }
}
