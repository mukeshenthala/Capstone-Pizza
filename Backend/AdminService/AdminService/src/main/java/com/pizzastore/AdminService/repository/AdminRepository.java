package com.pizzastore.AdminService.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pizzastore.AdminService.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByUsername(String username);

}