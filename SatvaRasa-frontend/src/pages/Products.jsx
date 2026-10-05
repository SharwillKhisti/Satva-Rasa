import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import {
    CategoryTabs,
    SortDropdown,
} from "../components/products/CatalogueControls";

import api from "../services/api";
import productImages from "../data/productImages";

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [category, setCategory] = useState(
        searchParams.get("category") || "All"
    );

    const [sort, setSort] = useState("featured");
    const [query, setQuery] = useState("");

    // Fetch products from Spring Boot
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/products");

                const productsWithImages = response.data.map(
                    (product) => ({
                        ...product,
                        imageUrl:
                            productImages[product.id] ||
                            product.imageUrl,
                    })
                );

                setProducts(productsWithImages);
            } catch (err) {
                console.error(
                    "Failed to fetch products:",
                    err
                );

                setError(
                    "Unable to load products. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Keep category in URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        setSearchParams(params, {
            replace: true,
        });
    }, [
        category,
        searchParams,
        setSearchParams,
    ]);

    // Filter and sort products
    const visibleProducts = useMemo(() => {
        let list = [...products];

        // Category filter
        if (category !== "All") {
            list = list.filter(
                (product) =>
                    product.category === category
            );
        }

        // Search
        if (query.trim()) {
            const q = query
                .trim()
                .toLowerCase();

            list = list.filter((product) => {
                const searchableText = [
                    product.name,
                    product.category,
                    product.description,
                    product.tagline,
                    product.ingredients,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(q);
            });
        }

        // Sorting
        switch (sort) {
            case "price-asc":
                list.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                );
                break;

            case "price-desc":
                list.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                );
                break;

            case "name-asc":
                list.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            case "rating-desc":
                list.sort(
                    (a, b) =>
                        Number(b.rating) -
                        Number(a.rating)
                );
                break;

            case "featured":
            default:
                // Keep backend order
                break;
        }

        return list;
    }, [
        products,
        category,
        sort,
        query,
    ]);

    // Loading state
    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <p className="text-sm text-bark/60">
                    Loading products...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16">
                <p className="text-sm text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-16">
            <h1 className="font-display text-4xl md:text-5xl text-forest-dark mb-8">
                Shop All
            </h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-6 border-b border-bark/10">
                <CategoryTabs
                    active={category}
                    onChange={setCategory}
                />

                <div className="flex items-center gap-3">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                    />

                    <SortDropdown
                        value={sort}
                        onChange={setSort}
                    />
                </div>
            </div>

            <p className="text-xs text-bark/50 mb-8">
                {visibleProducts.length}{" "}
                product
                {visibleProducts.length !== 1
                    ? "s"
                    : ""}
            </p>

            {visibleProducts.length > 0 ? (
                <ProductGrid
                    products={visibleProducts}
                />
            ) : (
                <div className="py-16 text-center">
                    <h2 className="text-lg font-semibold text-bark">
                        No products found
                    </h2>

                    <p className="text-sm text-bark/60 mt-2">
                        Try changing your search or filters.
                    </p>
                </div>
            )}
        </div>
    );
}