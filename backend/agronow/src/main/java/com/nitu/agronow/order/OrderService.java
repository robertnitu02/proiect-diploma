package com.nitu.agronow.order;

import com.nitu.agronow.stall.Stall;
import com.nitu.agronow.stall.StallRepository;
import com.nitu.agronow.user.User;
import com.nitu.agronow.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final StallRepository stallRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, StallRepository stallRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.stallRepository = stallRepository;
        this.userRepository = userRepository;
    }

    public void addOrder(Order order) {
        User user = userRepository
                .findById(order.getRequesterId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Stall stall = stallRepository
                .findById(order.getStallId())
                .orElseThrow(() -> new EntityNotFoundException("Stall not found"));

        Order finalOrder = new Order();
        finalOrder.setProducts(order.getProducts());
        finalOrder.setAddress(order.getAddress());
        finalOrder.setPrice(order.getPrice());
        finalOrder.setStatus(order.getStatus());
        finalOrder.setOrderDate(LocalDateTime.now());

        finalOrder.setStall(stall);
        finalOrder.setUser(user);

        orderRepository.save(finalOrder);
    }

    public List<OrderResponse> getAllOrdersFromStallId(Integer stallId) {
        return orderRepository.findAll()
                .stream()
                .filter(order -> order.getStall().getId().equals(stallId))
                .map(this::toOrderResponse)
                .toList();
    }

    public List<OrderResponse> getAllOrdersFromUserId(Integer userId) {
        return orderRepository.findAll()
                .stream()
                .filter(order -> order.getUser().getId().equals(userId))
                .map(this::toOrderResponse)
                .toList();
    }

    public void updateOrder(UpdateOrderData updateOrderData) {
        Order order = orderRepository
                .findById(updateOrderData.getId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        order.setStatus(updateOrderData.getStatus());
        if (updateOrderData.getShouldUpdateAcceptedDate())
            order.setAcceptedDate(LocalDateTime.now());
        if (updateOrderData.getShouldUpdateDeliveryDate())
            order.setDeliveryDate(LocalDateTime.now());
        orderRepository.save(order);
    }

    private OrderResponse toOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .products(order.getProducts())
                .address(order.getAddress())
                .price(order.getPrice())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .acceptedDate(order.getAcceptedDate())
                .deliveryDate(order.getDeliveryDate())
                .marketName(order.getStall().getMarket().getName())
                .marketId(order.getStall().getMarket().getId())
                .stallName(order.getStall().getName())
                .stallId(order.getStall().getId())
                .build();
    }
}
