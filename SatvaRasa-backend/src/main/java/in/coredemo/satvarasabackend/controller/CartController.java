package in.coredemo.satvarasabackend.controller;

import in.coredemo.satvarasabackend.dto.CartResponse;
import in.coredemo.satvarasabackend.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public CartResponse getCart(
            @RequestParam(required = false) String cartToken
    ) {
        return cartService.getCart(cartToken);
    }

    @PostMapping("/items")
    public CartResponse addToCart(
            @RequestParam(required = false) String cartToken,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return cartService.addToCart(
                cartToken,
                productId,
                quantity
        );
    }

    @PutMapping("/items/{productId}")
    public CartResponse updateQuantity(
            @RequestParam String cartToken,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        return cartService.updateQuantity(
                cartToken,
                productId,
                quantity
        );
    }

    @DeleteMapping("/items/{productId}")
    public CartResponse removeFromCart(
            @RequestParam String cartToken,
            @PathVariable Long productId
    ) {
        return cartService.removeFromCart(
                cartToken,
                productId
        );
    }

    @DeleteMapping
    public CartResponse clearCart(
            @RequestParam String cartToken
    ) {
        return cartService.clearCart(cartToken);
    }
}