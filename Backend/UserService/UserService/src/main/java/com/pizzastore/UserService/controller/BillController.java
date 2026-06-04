package com.pizzastore.UserService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.UserService.dto.BillDTO;
import com.pizzastore.UserService.entity.Bill;
import com.pizzastore.UserService.service.UserService;

@RestController
@RequestMapping("/bill")
public class BillController {

    @Autowired
    private UserService userService;

    @PostMapping("/generate")
    public Bill generateBill(@RequestBody BillDTO billDTO) {

        return userService.generateBill(billDTO);
    }
    @GetMapping("/{id}")
    public Bill getBill(@PathVariable Long id) {
        return userService.getBillById(id);
    }
}