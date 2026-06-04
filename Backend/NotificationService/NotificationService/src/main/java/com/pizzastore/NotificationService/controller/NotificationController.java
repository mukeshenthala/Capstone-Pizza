package com.pizzastore.NotificationService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pizzastore.NotificationService.entity.Notification;
import com.pizzastore.NotificationService.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public Notification sendNotification(
            @RequestBody Notification notification) {

        return notificationService
                .sendNotification(notification);
    }

    @GetMapping("/all")
    public List<Notification> getAllNotifications() {

        return notificationService
                .getAllNotifications();
    }
}