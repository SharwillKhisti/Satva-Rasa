package in.coredemo.satvarasabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private String status;
    private LocalDateTime createdAt;

    private String country;
    private String firstName;
    private String lastName;
    private String address;
    private String apartment;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;

    private double totalAmount;

    private List<OrderItemResponse> items;
}