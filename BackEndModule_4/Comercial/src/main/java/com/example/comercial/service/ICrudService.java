package com.example.comercial.service;

import java.util.List;
import java.util.Optional;

public interface ICrudService<E, ID> {
List<E> findAll();
Optional<E> findById(ID id);
E save(E e);
void deleteById(ID id);
}
