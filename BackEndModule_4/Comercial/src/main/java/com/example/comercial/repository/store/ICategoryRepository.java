package com.example.comercial.repository.store;

import com.example.comercial.model.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
}
