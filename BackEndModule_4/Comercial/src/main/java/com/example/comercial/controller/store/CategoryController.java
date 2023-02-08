package com.example.comercial.controller.store;

import com.example.comercial.model.product.Category;
import com.example.comercial.service.store.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<Iterable<Category>> findAll() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> findById(@PathVariable Long id) {
        return new ResponseEntity<>(categoryService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        return new ResponseEntity<>(categoryService.save(category), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@RequestBody Category category,
                                           @PathVariable Long id) {
        Optional<Category> categoryUpdated = categoryService.findById(id);
        if (categoryUpdated.isPresent()) {
            return new ResponseEntity<>(categoryService.save(category), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> delete(@PathVariable Long id) {
        Optional<Category> categoryDelete = categoryService.findById(id);
        if (categoryDelete.isPresent()) {
            if (categoryService.remove(id)) {
                return new ResponseEntity<>(categoryDelete.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(new Category(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
}
