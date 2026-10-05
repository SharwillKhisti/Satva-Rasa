import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartCount,
        cartTotal,
        loading,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const { isAuthenticated } = useAuth();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: "/checkout",
                },
            });

            return;
        }

        navigate("/checkout");
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16">
                <p>Loading cart...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Your Cart
                </h1>

                <p className="text-gray-600 mb-8">
                    Your cart is currently empty.
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="inline-block px-6 py-3 rounded-lg bg-black text-white"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Your Cart
                    </h1>

                    <p className="text-gray-600 mt-1">
                        {cartCount}{" "}
                        {cartCount === 1 ? "item" : "items"}
                    </p>
                </div>

                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:underline"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-5">
                    {cartItems.map((item) => (
                        <div
                            key={item.productId}
                            className="flex gap-5 border rounded-xl p-5"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-28 h-28 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h2 className="font-semibold text-lg">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-600 mt-1">
                                            ₹{item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            removeFromCart(
                                                item.productId
                                            )
                                        }
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex items-center border rounded-lg">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                            className="px-4 py-2 disabled:opacity-40"
                                        >
                                            −
                                        </button>

                                        <span className="px-4">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-4 py-2"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="font-semibold">
                                        ₹{item.subtotal.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="border rounded-xl p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-4">
                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹{cartTotal.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between border-t pt-4 font-bold text-lg">
                        <span>
                            Total
                        </span>

                        <span>
                            ₹{cartTotal.toFixed(2)}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleCheckout}
                        className="block text-center w-full mt-6 px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Proceed to Checkout
                    </button>

                    {!isAuthenticated && (
                        <p className="text-xs text-gray-500 text-center mt-3">
                            You’ll need to sign in before placing your order.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}