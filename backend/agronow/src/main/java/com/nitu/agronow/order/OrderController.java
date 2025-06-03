package com.nitu.agronow.order;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
@RequiredArgsConstructor
@Tag(name = "Order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        orderService.addOrder(order);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/stall/{id}")
    public ResponseEntity<List<OrderResponse>> getOrdersFromStallId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(orderService.getAllOrdersFromStallId(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<OrderResponse>> getOrdersFromUserId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(orderService.getAllOrdersFromUserId(id));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateOrder(@RequestBody UpdateOrderData updateOrderData) {
        orderService.updateOrder(updateOrderData);
        return ResponseEntity.accepted().build();
    }

}
