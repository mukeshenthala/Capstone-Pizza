package com.pizzastore.UserService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pizzastore.UserService.dto.BillDTO;
import com.pizzastore.UserService.dto.LoginDTO;
import com.pizzastore.UserService.dto.OrderDTO;
import com.pizzastore.UserService.dto.RegisterDTO;
import com.pizzastore.UserService.entity.Bill;
import com.pizzastore.UserService.entity.Order;
import com.pizzastore.UserService.entity.User;
import com.pizzastore.UserService.exception.OrderNotFoundException;
import com.pizzastore.UserService.exception.UserNotFoundException;
import com.pizzastore.UserService.repository.BillRepository;
import com.pizzastore.UserService.repository.OrderRepository;
import com.pizzastore.UserService.repository.UserRepository;
import com.pizzastore.UserService.security.JwtUtil;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BillRepository billRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public User registerUser(RegisterDTO dto) {

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setMobile(dto.getMobile());
        user.setAddress(dto.getAddress());

        return userRepository.save(user);
    }

    @Override
    public String loginUser(LoginDTO dto) {

        Optional<User> user =
                userRepository.findByEmail(dto.getEmail());

        if (user.isPresent()
                && user.get().getPassword()
                        .equals(dto.getPassword())) {

            return jwtUtil.generateToken(dto.getEmail());
        }

        throw new UserNotFoundException(
                "Invalid Email or Password");
    }

    @Override
    public Order placeOrder(OrderDTO dto) {

        Order order = new Order();

        order.setUserId(dto.getUserId());
        order.setTotalAmount(dto.getTotalAmount());
        order.setDeliveryMode(dto.getDeliveryMode());
        order.setStatus("PLACED");

        return orderRepository.save(order);
    }

    @Override
    public String cancelOrder(Long orderId) {

        Optional<Order> order =
                orderRepository.findById(orderId);

        if (order.isPresent()) {

            Order existingOrder = order.get();

            existingOrder.setStatus("CANCELLED");

            orderRepository.save(existingOrder);

            return "Order Cancelled Successfully";
        }

        throw new OrderNotFoundException(
                "Order Not Found");
    }

    @Override
    public Bill generateBill(BillDTO dto) {

        Bill bill = new Bill();

        bill.setOrderId(dto.getOrderId());
        bill.setAmount(dto.getAmount());
        bill.setPaymentMode(dto.getPaymentMode());

        return billRepository.save(bill);
    }
    
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    @Override
    public Bill getBillById(Long billId) {
        return billRepository.findById(billId).orElse(null);
    }
    @Override
    public String updateOrderStatus(
            Long id,
            String status){

        Order order =
                orderRepository.findById(id)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order Not Found"));

        order.setStatus(status);

        orderRepository.save(order);

        return "Status Updated";
    }
    @Override
    public List<Order> getOrdersByUser(
            Long userId){

        return orderRepository
                .findByUserId(userId);
    }
}