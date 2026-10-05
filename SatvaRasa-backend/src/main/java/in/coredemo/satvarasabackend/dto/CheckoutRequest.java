package in.coredemo.satvarasabackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutRequest {

    private String cartToken;

    private String country;

    private String firstName;
    private String lastName;

    private String address;
    private String apartment;

    private String city;
    private String state;
    private String zipCode;

    private String phoneNumber;
}