package com.pizzastore.AdminService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pizzastore.AdminService.dto.AdminLoginDTO;
import com.pizzastore.AdminService.dto.MenuDTO;
import com.pizzastore.AdminService.entity.Admin;
import com.pizzastore.AdminService.entity.MenuItem;
import com.pizzastore.AdminService.exception.MenuItemNotFoundException;
import com.pizzastore.AdminService.repository.AdminRepository;
import com.pizzastore.AdminService.repository.MenuRepository;
import com.pizzastore.AdminService.security.JwtUtil;

@Service
public class AdminServiceImpl implements AdminService {


@Autowired
private AdminRepository adminRepository;

@Autowired
private MenuRepository menuRepository;

@Autowired
private JwtUtil jwtUtil;

@Override
public String login(AdminLoginDTO loginDTO) {

    Optional<Admin> admin =
            adminRepository.findByUsername(
                    loginDTO.getUsername());

    if (admin.isPresent()
            && admin.get().getPassword()
                    .equals(loginDTO.getPassword())) {

        return jwtUtil.generateToken(
                loginDTO.getUsername());
    }

    return "Invalid Credentials";
}

@Override
public MenuItem addMenuItem(MenuDTO dto) {

    MenuItem item = new MenuItem();

    item.setItemName(dto.getItemName());
    item.setCategory(dto.getCategory());
    item.setDescription(dto.getDescription());
    item.setPrice(dto.getPrice());
    item.setImageUrl(dto.getImageUrl());

    return menuRepository.save(item);
}

@Override
public List<MenuItem> getAllMenuItems() {

    return menuRepository.findAll();
}

@Override
public MenuItem updateMenuItem(Long id,
        MenuDTO dto) {

    MenuItem item =
            menuRepository.findById(id)
                    .orElseThrow(() ->
                            new MenuItemNotFoundException(
                                    "Menu Item Not Found"));

    item.setItemName(dto.getItemName());
    item.setCategory(dto.getCategory());
    item.setDescription(dto.getDescription());
    item.setPrice(dto.getPrice());
    item.setImageUrl(dto.getImageUrl());

    return menuRepository.save(item);
}

@Override
public String deleteMenuItem(Long id) {

    MenuItem item =
            menuRepository.findById(id)
                    .orElseThrow(() ->
                            new MenuItemNotFoundException(
                                    "Menu Item Not Found"));

    menuRepository.delete(item);

    return "Menu Item Deleted Successfully";
}


}
