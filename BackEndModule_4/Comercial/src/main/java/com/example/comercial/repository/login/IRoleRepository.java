package com.example.comercial.repository.login;

import com.example.comercial.model.login.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);

}
