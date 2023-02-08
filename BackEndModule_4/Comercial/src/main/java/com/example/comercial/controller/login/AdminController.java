package com.example.comercial.controller.login;

import com.example.comercial.model.login.User;
import com.example.comercial.service.user.IAdminService;
import com.example.comercial.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private IAdminService iAdminService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAllUser() {
        List<User> userList = userService.findAll();
        if (userList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PutMapping("/id={id}&status={status}")
    public ResponseEntity<User> activeBlockUser(@PathVariable Long id, @PathVariable Integer status) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iAdminService.activeBlockUser(id, status);
        return new ResponseEntity<>(userService.save(userOptional.get()), HttpStatus.OK);
    }

    @PutMapping("/id={id}&add_role_seller")
    public ResponseEntity<User> addRoleBuyer(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iAdminService.addRole(id);
        return new ResponseEntity<>(userService.save(userOptional.get()), HttpStatus.OK);
    }
}
