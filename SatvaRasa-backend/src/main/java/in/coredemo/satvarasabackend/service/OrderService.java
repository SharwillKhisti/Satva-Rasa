package in.coredemo.satvarasabackend.service;

import in.coredemo.satvarasabackend.dto.CheckoutRequest;
import in.coredemo.satvarasabackend.entity.*;
import in.coredemo.satvarasabackend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    public OrderService(
            UserRepository userRepository,
            CartRepository cartRepository,
            OrderRepository orderRepository
    ) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order placeOrder(String email, CheckoutRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));

        Cart cart = cartRepository.findByCartToken(request.getCartToken())
                .orElseThrow(() -> new RuntimeException("Cart not found."));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        Order order = new Order();
        order.setUser(user);

        order.setCountry(request.getCountry());
        order.setFirstName(request.getFirstName());
        order.setLastName(request.getLastName());
        order.setAddress(request.getAddress());
        order.setApartment(request.getApartment());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setZipCode(request.getZipCode());
        order.setPhoneNumber(request.getPhoneNumber());

        double total = 0;

        for (CartItem cartItem : cart.getItems()) {

            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        product.getName() + " is out of stock."
                );
            }

            product.setStock(
                    product.getStock() - cartItem.getQuantity()
            );

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(product.getPrice());

            order.addItem(item);

            total += product.getPrice() * cartItem.getQuantity();
        }

        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();

        return savedOrder;
    }
}