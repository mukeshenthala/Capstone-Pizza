package com.pizzastore.UserService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pizzastore.UserService.dto.OrderDTO;
import com.pizzastore.UserService.entity.Order;
import com.pizzastore.UserService.service.UserService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private UserService userService;

    @PostMapping("/place")
    public Order placeOrder(
            @RequestBody OrderDTO dto) {

        return userService.placeOrder(dto);
    }

    @DeleteMapping("/cancel/{id}")
    public String cancelOrder(@PathVariable Long id) {

        return userService.cancelOrder(id);
    }
    @GetMapping("/all")
    public List<Order> getAllOrders() {

        return userService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(
            @PathVariable Long userId){

        return userService.getOrdersByUser(
                userId);
    }
    @PutMapping("/status/{id}/{status}")
    public String updateStatus(
            @PathVariable Long id,
            @PathVariable String status){

        return userService.updateOrderStatus(
                id,
                status);
    }
}