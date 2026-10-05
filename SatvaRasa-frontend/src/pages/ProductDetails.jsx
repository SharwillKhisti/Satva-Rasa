import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import { useCart } from "../context/CartContext";
import productImages from "../data/productImages";
import ProductGrid from "../components/products/ProductGrid";
import StarRating from "../components/products/StarRating";

export default function ProductDetails() {
    const { id } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const [error, setError] = useState("");
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/products/${id}`
                );

                const fetchedProduct = {
                    ...response.data,
                    imageUrl:
                        productImages[
                            response.data.id
                            ] || response.data.imageUrl,
                };

                setProduct(fetchedProduct);

                // Fetch all products for related products
                const productsResponse =
                    await api.get("/products");

                const related =
                    productsResponse.data
                        .filter(
                            (item) =>
                                item.id !==
                                fetchedProduct.id &&
                                item.category ===
                                fetchedProduct.category
                        )
                        .slice(0, 3)
                        .map((item) => ({
                            ...item,
                            imageUrl:
                                productImages[
                                    item.id
                                    ] || item.imageUrl,
                        }));

                setRelatedProducts(related);
            } catch (err) {
                console.error(
                    "Failed to fetch product:",
                    err
                );

                setError(
                    "Unable to load this product."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity((current) => {
            const next = current + change;

            if (next < 1) {
                return 1;
            }

            if (
                product?.stock &&
                next > product.stock
            ) {
                return product.stock;
            }

            return next;
        });
    };

    const handleAddToCart = async () => {
        if (!product) {
            return;
        }

        try {
            setAdding(true);

            await addToCart(
                product,
                quantity
            );

            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 2000);
        } catch (err) {
            console.error(
                "Failed to add product:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to add this product to cart."
            );
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-16">
                <p className="text-sm text-bark/60">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error && !product) {
        return (
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-16 text-center">
                <h1 className="text-2xl font-semibold">
                    Product Not Found
                </h1>

                <p className="text-sm text-bark/60 mt-2">
                    {error}
                </p>

                <Link
                    to="/products"
                    className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    const outOfStock =
        Number(product.stock) <= 0;

    return (
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16">

            {/* Breadcrumb */}
            <div className="text-sm text-bark/50 mb-8">
                <Link
                    to="/products"
                    className="hover:text-forest-dark"
                >
                    Products
                </Link>

                <span className="mx-2">
                    /
                </span>

                <span>
                    {product.name}
                </span>
            </div>

            {/* Product */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                {/* Image */}
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Information */}
                <div className="flex flex-col justify-center">

                    <p className="text-sm uppercase tracking-wider text-bark/50 mb-3">
                        {product.category}
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl text-forest-dark">
                        {product.name}
                    </h1>

                    {product.tagline && (
                        <p className="text-lg text-bark/70 mt-4">
                            {product.tagline}
                        </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-3 mt-5">
                        <StarRating
                            rating={product.rating}
                        />

                        <span className="text-sm text-bark/60">
                            {product.rating} ·{" "}
                            {product.reviews || 0} reviews
                        </span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-semibold mt-6">
                        ₹
                        {Number(
                            product.price
                        ).toFixed(2)}
                    </p>

                    {/* Description */}
                    {product.description && (
                        <p className="text-bark/70 leading-7 mt-6">
                            {product.description}
                        </p>
                    )}

                    {/* Stock */}
                    <div className="mt-6">
                        {outOfStock ? (
                            <p className="text-sm text-red-600">
                                Out of stock
                            </p>
                        ) : (
                            <p className="text-sm text-green-700">
                                {product.stock} available
                            </p>
                        )}
                    </div>

                    {/* Error */}
                    {error && product && (
                        <p className="text-sm text-red-600 mt-4">
                            {error}
                        </p>
                    )}

                    {/* Quantity + Cart */}
                    {!outOfStock && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">

                            <div className="flex items-center border rounded-lg">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleQuantityChange(
                                            -1
                                        )
                                    }
                                    disabled={
                                        quantity <= 1
                                    }
                                    className="px-4 py-3 disabled:opacity-30"
                                >
                                    −
                                </button>

                                <span className="px-5">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleQuantityChange(
                                            1
                                        )
                                    }
                                    disabled={
                                        quantity >=
                                        Number(
                                            product.stock
                                        )
                                    }
                                    className="px-4 py-3 disabled:opacity-30"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleAddToCart
                                }
                                disabled={adding}
                                className="flex-1 px-6 py-3 rounded-lg bg-black text-white disabled:opacity-50"
                            >
                                {adding
                                    ? "Adding..."
                                    : added
                                        ? "Added to Cart ✓"
                                        : "Add to Cart"}
                            </button>
                        </div>
                    )}

                    {added && (
                        <Link
                            to="/cart"
                            className="text-sm underline mt-4"
                        >
                            View Cart
                        </Link>
                    )}
                </div>
            </div>

            {/* Product Information */}
            <div className="grid md:grid-cols-2 gap-10 mt-20 pt-12 border-t border-bark/10">

                {product.ingredients && (
                    <div>
                        <h2 className="text-xl font-semibold text-forest-dark mb-4">
                            Ingredients
                        </h2>

                        <p className="text-bark/70 leading-7 whitespace-pre-line">
                            {product.ingredients}
                        </p>
                    </div>
                )}

                {product.howToUse && (
                    <div>
                        <h2 className="text-xl font-semibold text-forest-dark mb-4">
                            How to Use
                        </h2>

                        <p className="text-bark/70 leading-7 whitespace-pre-line">
                            {product.howToUse}
                        </p>
                    </div>
                )}
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-20 pt-12 border-t border-bark/10">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="text-sm uppercase tracking-wider text-bark/50">
                                You may also like
                            </p>

                            <h2 className="font-display text-3xl text-forest-dark mt-2">
                                More from{" "}
                                {product.category}
                            </h2>
                        </div>

                        <Link
                            to={`/products?category=${encodeURIComponent(
                                product.category
                            )}`}
                            className="text-sm underline"
                        >
                            View all
                        </Link>
                    </div>

                    <ProductGrid
                        products={relatedProducts}
                    />
                </section>
            )}
        </div>
    );
}