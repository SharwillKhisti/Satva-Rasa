package in.coredemo.satvarasabackend.service;

import in.coredemo.satvarasabackend.dto.CartItemResponse;
import in.coredemo.satvarasabackend.dto.CartResponse;
import in.coredemo.satvarasabackend.entity.Cart;
import in.coredemo.satvarasabackend.entity.CartItem;
import in.coredemo.satvarasabackend.entity.Product;
import in.coredemo.satvarasabackend.repository.CartItemRepository;
import in.coredemo.satvarasabackend.repository.CartRepository;
import in.coredemo.satvarasabackend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    private Cart getOrCreateCart(String cartToken) {

        if (cartToken == null || cartToken.isBlank()) {

            Cart cart = new Cart();
            cart.setCartToken(UUID.randomUUID().toString());

            return cartRepository.save(cart);
        }

        return cartRepository.findByCartToken(cartToken)
                .orElseGet(() -> {

                    Cart cart = new Cart();
                    cart.setCartToken(cartToken);

                    return cartRepository.save(cart);
                });
    }

    @Transactional
    public CartResponse getCart(String cartToken) {

        Cart cart = getOrCreateCart(cartToken);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse addToCart(
            String cartToken,
            Long productId,
            int quantity
    ) {

        if (quantity <= 0) {
            throw new RuntimeException(
                    "Quantity must be greater than zero."
            );
        }

        Cart cart = getOrCreateCart(cartToken);

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found.")
                );

        if (product.getStock() <= 0) {
            throw new RuntimeException(
                    "Product is out of stock."
            );
        }

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        productId
                )
                .orElse(null);

        if (item == null) {

            if (quantity > product.getStock()) {
                throw new RuntimeException(
                        "Not enough stock available."
                );
            }

            item = new CartItem();

            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);

            cart.addItem(item);

        } else {

            int newQuantity =
                    item.getQuantity() + quantity;

            if (newQuantity > product.getStock()) {
                throw new RuntimeException(
                        "Cannot add more than available stock."
                );
            }

            item.setQuantity(newQuantity);
        }

        cartItemRepository.save(item);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse updateQuantity(
            String cartToken,
            Long productId,
            int quantity
    ) {

        Cart cart = getOrCreateCart(cartToken);

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        productId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Cart item not found."
                        )
                );

        if (quantity <= 0) {

            cart.removeItem(item);
            cartItemRepository.delete(item);

        } else {

            if (quantity > item.getProduct().getStock()) {
                throw new RuntimeException(
                        "Quantity exceeds available stock."
                );
            }

            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse removeFromCart(
            String cartToken,
            Long productId
    ) {

        Cart cart = getOrCreateCart(cartToken);

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        productId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Cart item not found."
                        )
                );

        cart.removeItem(item);
        cartItemRepository.delete(item);

        return buildCartResponse(cart);
    }

    @Transactional
    public CartResponse clearCart(String cartToken) {

        Cart cart = getOrCreateCart(cartToken);

        cart.getItems().clear();

        return buildCartResponse(cart);
    }

    private CartResponse buildCartResponse(Cart cart) {

        List<CartItemResponse> items =
                cart.getItems()
                        .stream()
                        .map(item -> {

                            double price =
                                    item.getProduct().getPrice();

                            double subtotal =
                                    price * item.getQuantity();

                            return new CartItemResponse(
                                    item.getProduct().getId(),
                                    item.getProduct().getName(),
                                    item.getProduct().getImageUrl(),
                                    price,
                                    item.getQuantity(),
                                    subtotal
                            );
                        })
                        .toList();

        int totalItems =
                items.stream()
                        .mapToInt(CartItemResponse::getQuantity)
                        .sum();

        double total =
                items.stream()
                        .mapToDouble(CartItemResponse::getSubtotal)
                        .sum();

        return new CartResponse(
                cart.getCartToken(),
                items,
                totalItems,
                total
        );
    }
}