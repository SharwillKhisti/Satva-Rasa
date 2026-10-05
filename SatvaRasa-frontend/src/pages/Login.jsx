import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
    validateEmail,
    validatePassword,
} from "../utils/validation";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [isRegister, setIsRegister] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // Clear old error while user corrects input
        if (error) {
            setError("");
        }
    };

    const validateForm = () => {
        const emailError = validateEmail(form.email);

        if (emailError) {
            return emailError;
        }

        const passwordError = validatePassword(
            form.password
        );

        if (passwordError) {
            return passwordError;
        }

        if (isRegister) {
            if (
                form.confirmPassword !==
                form.password
            ) {
                return "Passwords do not match.";
            }
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const validationError =
            validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const endpoint = isRegister
                ? "/auth/register"
                : "/auth/login";

            const response = await api.post(
                endpoint,
                {
                    email: form.email.trim(),
                    password: form.password,
                    ...(isRegister && {
                        confirmPassword:
                        form.confirmPassword,
                    }),
                }
            );

            login(
                response.data.email,
                response.data.token
            );

            const redirectTo =
                location.state?.from ||
                "/products";

            navigate(redirectTo);
        } catch (err) {
            console.error(
                "Authentication failed:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);

        setForm({
            email: "",
            password: "",
            confirmPassword: "",
        });

        setError("");
    };

    return (
        <div className="max-w-md mx-auto px-6 py-16">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    {isRegister
                        ? "Create Your Account"
                        : "Welcome Back"}
                </h1>

                <p className="text-gray-600 mt-2">
                    {isRegister
                        ? "Create an account to continue."
                        : "Sign in to continue to checkout."}
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Email */}
                <div>
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete={
                            isRegister
                                ? "new-password"
                                : "current-password"
                        }
                        required
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    {isRegister && (
                        <p className="text-xs text-gray-500 mt-1">
                            Minimum 8 characters.
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                {isRegister && (
                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            name="confirmPassword"
                            type="password"
                            value={
                                form.confirmPassword
                            }
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="text-red-600 text-sm">
                        {error}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white rounded-lg px-6 py-3 disabled:opacity-50"
                >
                    {loading
                        ? "Please wait..."
                        : isRegister
                            ? "Create Account"
                            : "Login"}
                </button>
            </form>

            <div className="text-center mt-6">
                <button
                    type="button"
                    onClick={toggleMode}
                    className="text-sm underline"
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Create one"}
                </button>
            </div>
        </div>
    );
}