package com.example.comercial.controller.login;

import com.example.comercial.model.login.Role;
import com.example.comercial.model.login.User;
import com.example.comercial.service.impl.RoleService;
import com.example.comercial.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private RoleService roleService;

    @GetMapping("/list")
    public ResponseEntity<List<User>> findAll() {

        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>("Delete done!", HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody User user) {
        Optional<User> checkUser = userService.findByUsername(user.getUsername());
        String encodePassword;
        encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        if (!checkUser.isPresent()) {
            Role role = roleService.findByName("BUYER");
            user.setRoles(new HashSet<>());
            user.getRoles().add(role);
            return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable Long id) {
        Optional<User> userUpdate = userService.findById(id);
        if (userUpdate.isPresent()) {
            user.setRoles(userUpdate.get().getRoles());
            return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
        }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/change/{id}")
    public ResponseEntity<User> changePassword(@RequestBody User user, @PathVariable Long id){
        Optional<User> userChange = userService.findById(id);
        if (userChange.isPresent()){
            user.setId(userChange.get().getId());
            user.setName(userChange.get().getName());
            user.setUsername(userChange.get().getUsername());
            user.setAddress(userChange.get().getAddress());
            user.setPhone(userChange.get().getPhone());
            user.setStatus(userChange.get().getStatus());
            user.setWallet(userChange.get().getWallet());
            user.setRoles(userChange.get().getRoles());
            String encodePassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodePassword);
            return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
        }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
