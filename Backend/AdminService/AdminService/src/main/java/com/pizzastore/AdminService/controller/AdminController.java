package com.pizzastore.AdminService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.AdminService.dto.AdminLoginDTO;
import com.pizzastore.AdminService.service.AdminService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public String login(
            @RequestBody AdminLoginDTO loginDTO) {

        return adminService.login(loginDTO);
    }
}