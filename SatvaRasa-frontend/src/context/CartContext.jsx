import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartToken, setCartToken] = useState(
        () => localStorage.getItem("satva-rasa-cart-token")
    );

    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const saveCart = (cart) => {
        setCartItems(cart.items || []);
        setCartTotal(cart.total || 0);
        setCartCount(cart.totalItems || 0);

        if (cart.cartToken) {
            localStorage.setItem(
                "satva-rasa-cart-token",
                cart.cartToken
            );

            setCartToken(cart.cartToken);
        }
    };

    const fetchCart = async () => {
        try {
            setLoading(true);

            const response = await api.get("/cart", {
                params: cartToken ? { cartToken } : {},
            });

            saveCart(response.data);
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (product, quantity = 1) => {
        try {
            const response = await api.post("/cart/items", null, {
                params: {
                    cartToken,
                    productId: product.id,
                    quantity,
                },
            });

            saveCart(response.data);
        } catch (error) {
            console.error("Failed to add item:", error);
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await api.put(
                `/cart/items/${productId}`,
                null,
                {
                    params: {
                        cartToken,
                        quantity,
                    },
                }
            );

            saveCart(response.data);
        } catch (error) {
            console.error("Failed to update cart:", error);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await api.delete(
                `/cart/items/${productId}`,
                {
                    params: {
                        cartToken,
                    },
                }
            );

            saveCart(response.data);
        } catch (error) {
            console.error("Failed to remove item:", error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            const response = await api.delete("/cart", {
                params: {
                    cartToken,
                },
            });

            saveCart(response.data);
        } catch (error) {
            console.error("Failed to clear cart:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartToken,
                cartItems,
                cartCount,
                cartTotal,
                loading,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                refreshCart: fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}