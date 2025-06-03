package com.nitu.agronow.order;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.nitu.agronow.stall.Stall;
import com.nitu.agronow.stall.StallRepository;
import com.nitu.agronow.user.User;
import com.nitu.agronow.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

        List<ProductData> orderProductsData = toProductDataArray(order.getProducts());
        List<ProductData> stallProductsData = toProductDataArray(stall.getProducts());

        for (ProductData orderedProduct : orderProductsData) {
            Integer orderedId = orderedProduct.getId();
            int orderedQty = Integer.parseInt(orderedProduct.getQuantity());

            for (ProductData stallProduct : stallProductsData) {
                if (stallProduct.getId().equals(orderedId)) {
                    int currentQty = Integer.parseInt(stallProduct.getQuantity());
                    int newQty = Math.max(currentQty - orderedQty, 0);
                    stallProduct.setQuantity(String.valueOf(newQty));
                    break;
                }
            }
        }

        Order finalOrder = new Order();
        finalOrder.setProducts(order.getProducts());
        finalOrder.setAddress(order.getAddress());
        finalOrder.setPrice(order.getPrice());
        finalOrder.setStatus(order.getStatus());
        finalOrder.setOrderDate(LocalDateTime.now());

        finalOrder.setStall(stall);
        finalOrder.setUser(user);

        orderRepository.save(finalOrder);

        stall.setProducts(toProductDataString(stallProductsData));
        stallRepository.save(stall);
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
        if (updateOrderData.getStatus() == OrderStatus.IN_DELIVERY.ordinal())
            order.setAcceptedDate(LocalDateTime.now());
        if (updateOrderData.getStatus() == OrderStatus.DELIVERED.ordinal())
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

    private List<ProductData> toProductDataArray(String data) {
        Gson gson = new Gson();
        Type listType = new TypeToken<List<ProductData>>() {}.getType();
        return gson.fromJson(data, listType);
    }

    private String toProductDataString(List<ProductData> data) {
        Gson gson = new Gson();
        Type listType = new TypeToken<List<ProductData>>() {}.getType();
        return gson.toJson(data, listType);
    }
}
