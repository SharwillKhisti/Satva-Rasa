package in.coredemo.satvarasabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CartResponse {

    private String cartToken;
    private List<CartItemResponse> items;
    private int totalItems;
    private double total;
}