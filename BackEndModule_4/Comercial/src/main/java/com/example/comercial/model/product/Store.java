package com.example.comercial.model.product;

import com.example.comercial.model.login.User;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String nameStore;
    @NotNull
    @Column(unique = true)
    private String phoneStore;
    @NotNull
    private String addressStore;
    @NotNull
    private String logo;
    @NotNull
    private String description;
    @ManyToOne
    private User user;
}
