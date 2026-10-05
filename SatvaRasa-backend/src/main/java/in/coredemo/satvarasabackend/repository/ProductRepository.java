package in.coredemo.satvarasabackend.repository;

import in.coredemo.satvarasabackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}