package com.pizzastore.AdminService.service;

import java.util.List;

import com.pizzastore.AdminService.dto.AdminLoginDTO;
import com.pizzastore.AdminService.dto.MenuDTO;
import com.pizzastore.AdminService.entity.MenuItem;

public interface AdminService {

    String login(AdminLoginDTO loginDTO);

    MenuItem addMenuItem(MenuDTO menuDTO);

    List<MenuItem> getAllMenuItems();

    MenuItem updateMenuItem(Long id, MenuDTO menuDTO);

    String deleteMenuItem(Long id);
}