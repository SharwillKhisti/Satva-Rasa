package in.coredemo.satvarasabackend.repository;

import in.coredemo.satvarasabackend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}