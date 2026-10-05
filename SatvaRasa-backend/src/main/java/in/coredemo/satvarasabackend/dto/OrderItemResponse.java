package in.coredemo.satvarasabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderItemResponse {

    private Long productId;
    private String productName;
    private int quantity;
    private double price;
    private double subtotal;
}