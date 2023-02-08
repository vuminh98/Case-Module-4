package com.example.comercial.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IGeneralService<E> {

    Iterable<E> findAll();
    Optional<E> findById(Long id);
    Iterable<E> findByName(String name);

    Page<E> findAllPage(Pageable pageable);
    E save(E e);
    boolean remove(Long id);
}
