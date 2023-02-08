package com.example.comercial.controller.store;

import com.example.comercial.model.cart.HistoryBuy;
import com.example.comercial.model.cart.Payment;
import com.example.comercial.model.product.Store;
import com.example.comercial.service.store.IStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/store")
public class StoreController {
    @Autowired
    private IStoreService storeService;

    @Value("${upload.path}")
    private String link;

    @Value("${display.path}")
    private String displayLink;

    @GetMapping
    public ResponseEntity<Iterable<Store>> findAllStore() {
        return new ResponseEntity<>(storeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/searchStore")
    public ResponseEntity<Page<Store>> searchStore(@RequestParam("search") String name, @PageableDefault Pageable pageable) {
        return new ResponseEntity<>(storeService.findAllByNameStoreContaining(name, pageable), HttpStatus.OK);
    }

    @GetMapping("/getIdStore/{id}")
    public ResponseEntity<Optional<Store>> findStoreById(@PathVariable Long id) {
        return new ResponseEntity<>(storeService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/createStore")
    public ResponseEntity<Store> createStore(@RequestBody Store store) {
        return new ResponseEntity<>(storeService.save(store), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStore(@RequestBody Store store,
                                          @PathVariable Long id) {
        Optional<Store> storeUpdated = storeService.findById(id);
        if (storeUpdated.isPresent()) {
            return new ResponseEntity<>(storeService.save(store), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStore(@PathVariable Long id) {
        storeService.remove(id);
        return new ResponseEntity<>("Delete done!", HttpStatus.OK);
    }

    @PostMapping(value = "/uploadStore")
    public ResponseEntity<Store> createUpload(@RequestPart(value = "fileStore", required = false) MultipartFile file,
                                                @RequestPart("store") Store store ) {
        if (file != null) {
            String fileName = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(link + fileName));
            } catch (IOException e) {
                e.printStackTrace();
            }
            store.setLogo(displayLink + fileName);
        } else {
            store.setLogo(displayLink + "7up.jpg");
        }
        return new ResponseEntity<>(storeService.save(store), HttpStatus.CREATED);
    }

    @PostMapping(value = "upload1")
    public ResponseEntity<?> createUpload1(@RequestPart("file") MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/{storeId}")
    public ResponseEntity<Iterable<Payment>> findAllPaymentByStore(@PathVariable Long storeId) {
        try {
            if (storeService.paymentByStore(storeId) != null) {
                return new ResponseEntity<>(storeService.paymentByStore(storeId), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/search_payments")
    public ResponseEntity<Iterable<Payment>> findAllPaymentBySearch(@RequestPart("key") String key,
                                                                    @RequestPart("value") String value,
                                                                    @RequestPart("storeId") String storeId) {
        try {
            return new ResponseEntity<>(storeService.paymentsBySearch(key,value,storeId),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/one_user")
    public ResponseEntity<Iterable<Payment>> findAllPaymentByUser(@RequestParam("user") Long user,
                                                                  @RequestParam("store") Long store) {
        try {
            if (storeService.paymentByOneUser(user,store) != null) {
                return new ResponseEntity<>(storeService.paymentByOneUser(user,store), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/detail_payment/{paymentId}")
    public ResponseEntity<Iterable<HistoryBuy>> paymentDetail(@PathVariable Long paymentId) {
        try {
            if (storeService.paymentDetails(paymentId) != null) {
                return new ResponseEntity<>(storeService.paymentDetails(paymentId), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
