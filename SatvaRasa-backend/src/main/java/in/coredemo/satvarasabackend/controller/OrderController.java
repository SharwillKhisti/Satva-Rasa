package in.coredemo.satvarasabackend.controller;

import in.coredemo.satvarasabackend.dto.CheckoutRequest;
import in.coredemo.satvarasabackend.dto.OrderItemResponse;
import in.coredemo.satvarasabackend.dto.OrderResponse;
import in.coredemo.satvarasabackend.entity.Order;
import in.coredemo.satvarasabackend.service.OrderService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public OrderResponse checkout(
            Authentication authentication,
            @RequestBody CheckoutRequest request
    ) {
        String email = authentication.getName();

        Order order = orderService.placeOrder(email, request);

        List<OrderItemResponse> items = order.getItems()
                .stream()
                .map(item -> new OrderItemResponse(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getPrice() * item.getQuantity()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getStatus(),
                order.getCreatedAt(),
                order.getCountry(),
                order.getFirstName(),
                order.getLastName(),
                order.getAddress(),
                order.getApartment(),
                order.getCity(),
                order.getState(),
                order.getZipCode(),
                order.getPhoneNumber(),
                order.getTotalAmount(),
                items
        );
    }
}