package com.pizzastore.UserService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pizzastore.UserService.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> {

}