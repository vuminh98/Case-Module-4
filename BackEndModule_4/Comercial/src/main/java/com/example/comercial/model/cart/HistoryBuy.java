package com.example.comercial.model.cart;

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
@Check(constraints = "quantity >= 0")
public class HistoryBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Payment payment;
    @ManyToOne
    private Product product;
    private Integer quantity;
}
