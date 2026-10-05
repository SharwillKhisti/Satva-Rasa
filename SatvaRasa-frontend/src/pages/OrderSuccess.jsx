import { Link, useLocation, Navigate } from "react-router-dom";

export default function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return <Navigate to="/products" replace />;
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <div className="text-5xl mb-5">✓</div>

                <h1 className="text-3xl font-bold">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mt-3">
                    Thank you for shopping with Satva Rasa.
                </p>
            </div>

            <div className="border rounded-xl p-6 space-y-6">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Order Number
                        </p>

                        <p className="font-semibold">
                            #{order.id}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <p className="font-semibold">
                            {order.status}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h2 className="font-semibold text-lg mb-4">
                        Items
                    </h2>

                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex justify-between"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.productName}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                                <p className="font-medium">
                                    ₹{item.subtotal.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                        ₹{order.totalAmount.toFixed(2)}
                    </span>
                </div>

                <div className="border-t pt-6">
                    <h2 className="font-semibold text-lg mb-3">
                        Delivery Address
                    </h2>

                    <p>{order.firstName} {order.lastName}</p>
                    <p>{order.address}</p>

                    {order.apartment && (
                        <p>{order.apartment}</p>
                    )}

                    <p>
                        {order.city}, {order.state}{" "}
                        {order.zipCode}
                    </p>

                    <p>{order.country}</p>

                    <p className="mt-2">
                        Phone: {order.phoneNumber}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <Link
                    to="/products"
                    className="px-6 py-3 rounded-lg bg-black text-white"
                >
                    Continue Shopping
                </Link>

                <Link
                    to="/cart"
                    className="px-6 py-3 rounded-lg border"
                >
                    View Cart
                </Link>
            </div>
        </div>
    );
}