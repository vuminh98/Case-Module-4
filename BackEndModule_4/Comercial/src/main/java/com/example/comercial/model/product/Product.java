package com.example.comercial.model.product;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    @Check(constraints = "price >= 0")
    private Double price;
    @NotNull
    @Check(constraints = "quantity >= 0")
    private Integer quantity;
    @NotNull
    private String description;
    @NotNull
    private Integer discount;
    @NotNull
    private String image;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Store store;
}
