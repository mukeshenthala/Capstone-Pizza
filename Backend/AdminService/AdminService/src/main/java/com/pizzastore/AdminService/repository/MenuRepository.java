package com.pizzastore.AdminService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pizzastore.AdminService.entity.MenuItem;

public interface MenuRepository extends JpaRepository<MenuItem, Long> {

}