package com.pizzastore.NotificationService.service;

import java.util.List;

import com.pizzastore.NotificationService.entity.Notification;

public interface NotificationService {

    Notification sendNotification(Notification notification);

    List<Notification> getAllNotifications();
}