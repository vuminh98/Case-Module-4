package com.example.comercial.model.cart;

import com.example.comercial.model.login.User;
import com.example.comercial.model.product.Store;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Store store;
    private LocalDate dateCreated;
    private boolean status;
    private Double totalPrice;

}
