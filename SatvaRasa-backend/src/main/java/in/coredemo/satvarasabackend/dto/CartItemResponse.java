package in.coredemo.satvarasabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CartItemResponse {

    private Long productId;
    private String name;
    private String imageUrl;
    private double price;
    private int quantity;
    private double subtotal;
}