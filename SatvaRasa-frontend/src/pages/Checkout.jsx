import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import {
    validateName,
    validateAddress,
    validateCityState,
    validatePostalCode,
    validatePhone,
} from "../utils/validation";

export default function Checkout() {
    const navigate = useNavigate();

    const {
        cartToken,
        cartItems,
        cartTotal,
        loading: cartLoading,
    } = useCart();

    const { user, isAuthenticated } = useAuth();

    const [form, setForm] = useState({
        country: "India",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /*
     * Protect checkout page.
     *
     * If the user is not logged in, send them to Login.
     * After successful login, Login.jsx will redirect them
     * back to /checkout using location.state.from.
     */
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", {
                replace: true,
                state: {
                    from: "/checkout",
                },
            });
        }
    }, [isAuthenticated, navigate]);

    /*
     * While the redirect is happening, don't render
     * the checkout form to an unauthenticated user.
     */
    if (!isAuthenticated) {
        return null;
    }

    /*
     * Wait for cart data.
     */
    if (cartLoading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16">
                <p>Loading checkout...</p>
            </div>
        );
    }

    /*
     * Don't allow checkout with an empty cart.
     */
    if (cartItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Your Cart Is Empty
                </h1>

                <p className="text-gray-600 mb-8">
                    Add some products before proceeding to checkout.
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-3 bg-black text-white rounded-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const validateForm = () => {
        let validationError;

        validationError = validateName(
            form.firstName,
            "First name"
        );

        if (validationError) {
            return validationError;
        }

        validationError = validateName(
            form.lastName,
            "Last name"
        );

        if (validationError) {
            return validationError;
        }

        validationError = validateAddress(
            form.address
        );

        if (validationError) {
            return validationError;
        }

        validationError = validateCityState(
            form.city,
            "City"
        );

        if (validationError) {
            return validationError;
        }

        validationError = validateCityState(
            form.state,
            "State"
        );

        if (validationError) {
            return validationError;
        }

        validationError = validatePostalCode(
            form.zipCode
        );

        if (validationError) {
            return validationError;
        }

        validationError = validatePhone(
            form.phoneNumber
        );

        if (validationError) {
            return validationError;
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setSubmitting(true);

        try {
            const response = await api.post(
                "/orders/checkout",
                {
                    cartToken,

                    ...form,

                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    address: form.address.trim(),
                    apartment: form.apartment.trim(),
                    city: form.city.trim(),
                    state: form.state.trim(),
                    zipCode: form.zipCode.trim(),
                    phoneNumber: form.phoneNumber.trim(),
                }
            );

            /*
             * Order successfully created.
             */
            navigate("/order-success", {
                state: {
                    order: response.data,
                },
            });
        } catch (err) {
            console.error(
                "Checkout failed:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to place your order. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Contact */}
                        <div>
                            <h2 className="text-xl font-semibold mb-5">
                                Contact Information
                            </h2>

                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                            />
                        </div>

                        {/* Shipping */}
                        <div>
                            <h2 className="text-xl font-semibold mb-5">
                                Shipping Address
                            </h2>

                            {/* First / Last Name */}
                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <input
                                        name="firstName"
                                        placeholder="First name"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                </div>

                                <div>
                                    <input
                                        name="lastName"
                                        placeholder="Last name"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                </div>

                            </div>

                            {/* Address */}
                            <input
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3 mt-4"
                            />

                            {/* Apartment */}
                            <input
                                name="apartment"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={form.apartment}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 mt-4"
                            />

                            {/* City / State */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">

                                <input
                                    name="city"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                    className="border rounded-lg px-4 py-3"
                                />

                                <input
                                    name="state"
                                    placeholder="State"
                                    value={form.state}
                                    onChange={handleChange}
                                    required
                                    className="border rounded-lg px-4 py-3"
                                />

                            </div>

                            {/* ZIP / Phone */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">

                                <input
                                    name="zipCode"
                                    placeholder="ZIP / Postal code"
                                    value={form.zipCode}
                                    onChange={handleChange}
                                    required
                                    className="border rounded-lg px-4 py-3"
                                />

                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    placeholder="10-digit phone number"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="border rounded-lg px-4 py-3"
                                />

                            </div>
                        </div>

                        {/* Validation / API Error */}
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-black text-white rounded-lg px-6 py-4 disabled:opacity-50"
                        >
                            {submitting
                                ? "Placing Order..."
                                : `Place Order • ₹${cartTotal.toFixed(2)}`}
                        </button>

                    </form>
                </div>

                {/* Order Summary */}
                <div className="border rounded-xl p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-5">

                        {cartItems.map((item) => (
                            <div
                                key={item.productId}
                                className="flex gap-4"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />

                                <div className="flex-1">
                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Qty: {item.quantity}
                                    </p>
                                </div>

                                <p className="font-medium">
                                    ₹{item.subtotal.toFixed(2)}
                                </p>
                            </div>
                        ))}

                    </div>

                    <div className="border-t mt-6 pt-5 flex justify-between font-bold text-lg">
                        <span>
                            Total
                        </span>

                        <span>
                            ₹{cartTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}