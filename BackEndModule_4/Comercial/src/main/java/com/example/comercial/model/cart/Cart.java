package com.example.comercial.model.cart;

import com.example.comercial.model.login.User;
import com.example.comercial.model.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "price >= 0 AND quantity > 0")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private Double price;
    @ManyToOne
    private User user;
    @ManyToOne
    private Product product;
}
