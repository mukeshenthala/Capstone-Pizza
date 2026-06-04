package com.pizzastore.UserService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.UserService.dto.LoginDTO;
import com.pizzastore.UserService.dto.RegisterDTO;
import com.pizzastore.UserService.entity.User;
import com.pizzastore.UserService.repository.UserRepository;
import com.pizzastore.UserService.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

@Autowired
private UserService userService;

@Autowired
private UserRepository userRepository;

@PostMapping("/register")
public User registerUser(@RequestBody RegisterDTO registerDTO) {
    return userService.registerUser(registerDTO);
}

@PostMapping("/login")
public String loginUser(@RequestBody LoginDTO loginDTO) {
    return userService.loginUser(loginDTO);
}

@GetMapping("/all")
public List<User> getAllUsers() {
    return userRepository.findAll();
}

}