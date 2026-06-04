package com.pizzastore.AdminService.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.AdminService.dto.MenuDTO;
import com.pizzastore.AdminService.entity.MenuItem;
import com.pizzastore.AdminService.service.AdminService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public MenuItem addMenuItem(
            @RequestBody MenuDTO menuDTO) {

        return adminService.addMenuItem(menuDTO);
    }

    @GetMapping("/all")
    public List<MenuItem> getAllMenuItems() {

        return adminService.getAllMenuItems();
    }

    @PutMapping("/update/{id}")
    public MenuItem updateMenuItem(
            @PathVariable Long id,
            @RequestBody MenuDTO menuDTO) {

        return adminService.updateMenuItem(
                id, menuDTO);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteMenuItem(
            @PathVariable Long id) {

        return adminService.deleteMenuItem(id);
    }
}