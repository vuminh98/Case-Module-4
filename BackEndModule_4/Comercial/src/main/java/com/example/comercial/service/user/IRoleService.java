package com.example.comercial.service.user;

import com.example.comercial.model.login.Role;

import java.util.List;

public interface IRoleService {
    List<Role> findAllRole();
    Role save(Role role);
}
