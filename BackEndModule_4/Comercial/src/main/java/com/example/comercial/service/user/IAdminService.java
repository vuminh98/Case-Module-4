package com.example.comercial.service.user;

public interface IAdminService {
    void activeBlockUser(Long id, Integer status);
    void addRole(Long id);
}
