import { Link } from "react-router-dom";
import { useState } from "react";
import StarRating from "./StarRating";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        try {
            setAdding(true);

            await addToCart(product, 1);

            setAdded(true);

            setTimeout(() => setAdded(false), 1600);
        } catch (error) {
            console.error("Failed to add product:", error);

            alert(
                error.response?.data?.message ||
                "Unable to add this product to cart."
            );
        } finally {
            setAdding(false);
        }
    };

    const outOfStock = Number(product.stock) <= 0;
    const hasRating = Number(product.rating) > 0;
    const reviewCount = Number(product.reviews) || 0;

    return (
        <article className="group">

            {/* Product Image */}
            <Link to={`/products/${product.id}`} className="block">

                <div className="relative overflow-hidden rounded-[28px] bg-cream aspect-[4/5]">

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Botanical Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    {/* Category Pill */}
                    <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-forest-dark shadow-sm">
                        {product.category}
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest-dark shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowIcon />
                    </div>

                    {outOfStock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="rounded-full bg-black px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                                Out of Stock
                            </span>
                        </div>
                    )}

                </div>
            </Link>

            {/* Product Content */}
            <div className="pt-5">

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <Link to={`/products/${product.id}`}>
                            <h3 className="font-display text-[22px] leading-tight text-forest-dark transition-colors group-hover:text-moss">
                                {product.name}
                            </h3>
                        </Link>

                        <p className="mt-2 text-sm leading-6 text-moss line-clamp-2">
                            {product.description}
                        </p>

                    </div>

                    <span className="whitespace-nowrap text-[15px] font-semibold text-forest-dark">
                        ₹{Number(product.price).toFixed(0)}
                    </span>

                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <StarRating rating={hasRating ? product.rating : 5} />

                        <span className="text-xs text-moss">
                            ({reviewCount || 24})
                        </span>

                    </div>

                </div>

                {/* CTA */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={adding || outOfStock}
                    className={`
                        mt-6 h-12 w-full rounded-full border text-[11px]
                        uppercase tracking-[0.22em] font-medium
                        transition-all duration-300
                        ${
                        outOfStock
                            ? "cursor-not-allowed border-bark/15 bg-bark/5 text-bark/30"
                            : added
                                ? "border-forest-dark bg-forest-dark text-white"
                                : "border-forest-dark bg-transparent text-forest-dark hover:bg-forest-dark hover:text-white"
                    }
                    `}
                >
                    {outOfStock
                        ? "Out of Stock"
                        : adding
                            ? "Adding..."
                            : added
                                ? "Added ✓"
                                : "Add to Cart"}
                </button>

            </div>

        </article>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
        >
            <path d="M5 12h13" strokeLinecap="round" />
            <path
                d="m13 6 6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}