import { Link } from "react-router-dom";
import productImages from "../../data/productImages";

const categories = [
    {
        name: "Hair",
        description:
            "Nourish, strengthen and care for your hair.",
        image: productImages[1],
        link: "/products?category=Hair",
    },
    {
        name: "Skin",
        description:
            "Simple, thoughtful care for healthy-looking skin.",
        image: productImages[7],
        link: "/products?category=Skin",
    },
];

export default function CategorySection() {
    return (
        <section className="px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-7xl mx-auto">

                <div className="text-center max-w-xl mx-auto mb-12">
                    <p className="text-xs uppercase tracking-[0.2em] text-moss mb-4">
                        Explore
                    </p>

                    <h2 className="font-display text-3xl md:text-4xl text-forest-dark">
                        Shop by Category
                    </h2>

                    <p className="mt-4 text-sm text-bark/60 leading-relaxed">
                        Discover Ayurvedic-inspired essentials for your
                        hair and skin.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={category.link}
                            className="group"
                        >
                            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-sand-dark">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="pt-5 flex items-end justify-between gap-4">
                                <div>
                                    <h3 className="font-display text-2xl text-forest-dark">
                                        {category.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-bark/60">
                                        {category.description}
                                    </p>
                                </div>

                                <span className="text-sm border-b border-bark pb-1 shrink-0">
                                    Shop
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}