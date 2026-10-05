package in.coredemo.satvarasabackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Logged in user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Shipping Details
    private String country;
    private String firstName;
    private String lastName;
    private String address;
    private String apartment;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;

    // Order Summary
    private Double totalAmount;

    private LocalDateTime createdAt;

    private String status = "NEW";

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    public void createdOn() {
        createdAt = LocalDateTime.now();
    }

    public void addItem(OrderItem item){
        items.add(item);
        item.setOrder(this);
    }
}