import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import productImages from "../../data/productImages";
import ProductCard from "../products/ProductCard";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const response = await api.get("/products");

            setProducts(
                response.data.slice(0, 4).map((product) => ({
                    ...product,
                    imageUrl: productImages[product.id],
                }))
            );
        };

        loadProducts();
    }, []);

    return (
        <section className="bg-sand py-24">

            <div className="max-w-7xl mx-auto px-6 md:px-10">

                {/* Heading */}

                <div className="flex justify-between items-end mb-14">

                    <div>
                        <p className="uppercase tracking-[0.3em] text-xs text-moss mb-3">
                            The Collection
                        </p>

                        <h2 className="font-display text-4xl md:text-5xl text-forest-dark leading-tight">
                            Everyday essentials,
                            <br />
                            rooted in Ayurveda.
                        </h2>
                    </div>

                    <Link
                        to="/products"
                        className="hidden md:block border-b border-black text-sm uppercase tracking-[0.2em]"
                    >
                        Shop All
                    </Link>

                </div>

                {/* Product Shelf */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}