package com.pizzastore.UserService.service;

import java.util.List;

import com.pizzastore.UserService.dto.BillDTO;
import com.pizzastore.UserService.dto.LoginDTO;
import com.pizzastore.UserService.dto.OrderDTO;
import com.pizzastore.UserService.dto.RegisterDTO;
import com.pizzastore.UserService.entity.Bill;
import com.pizzastore.UserService.entity.Order;
import com.pizzastore.UserService.entity.User;

public interface UserService {

    User registerUser(RegisterDTO registerDTO);

    String loginUser(LoginDTO loginDTO);

    Order placeOrder(OrderDTO orderDTO);

    String cancelOrder(Long orderId);

    Bill generateBill(BillDTO billDTO);

    List<Order> getAllOrders();

    List<Order> getOrdersByUser(Long userId);

    Bill getBillById(Long billId);

    String updateOrderStatus(
            Long id,
            String status);
}