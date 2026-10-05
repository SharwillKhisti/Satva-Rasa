package in.coredemo.satvarasabackend.service;

import in.coredemo.satvarasabackend.entity.Product;
import in.coredemo.satvarasabackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found."));
    }

    // Add a product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
}