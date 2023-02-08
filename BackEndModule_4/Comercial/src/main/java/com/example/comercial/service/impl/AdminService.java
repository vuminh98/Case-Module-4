package com.example.comercial.service.impl;

import com.example.comercial.service.user.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService implements IAdminService {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Override
    public void activeBlockUser(Long id, Integer status) {
        userService.findById(id).get().setStatus(status);
    }
    @Override
    public void addRole(Long id) {
        userService.findById(id).get().setStatus(1);
        userService.findById(id).get().getRoles().add(roleService.findByName("SELLER"));
    }
}
