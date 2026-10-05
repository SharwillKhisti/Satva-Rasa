import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-104px)] overflow-hidden bg-forest-dark">

            {/* Background Image */}
            <img
                src={heroImage}
                alt="Satva Rasa Ayurvedic hair and skincare"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-center
                "
            />

            {/* Warm Botanical Color Wash */}
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-[#26382D]/65
                    via-transparent
                    to-[#D9D5C8]/25
                "
            />

            {/* Soft Lavender Glow */}
            <div
                className="
                    absolute
                    -left-32
                    -top-32
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#D8D5E6]/20
                    blur-[120px]
                "
            />

            {/* Soft Rose Glow */}
            <div
                className="
                    absolute
                    -bottom-40
                    -right-20
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#E7C8C0]/20
                    blur-[140px]
                "
            />

            {/* Bottom Fade */}
            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-48
                    bg-gradient-to-t
                    from-black/35
                    to-transparent
                "
            />

            {/* Hero Content */}
            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-[calc(100vh-104px)]
                    items-end
                "
            >
                <div
                    className="
                        w-full
                        px-6
                        pb-16
                        md:px-12
                        md:pb-20
                        lg:px-16
                    "
                >
                    <div className="max-w-3xl text-white">

                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-4">

                            <span className="h-px w-10 bg-white/60" />

                            <p
                                className="
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.28em]
                                    text-white/85
                                "
                            >
                                Rooted in Ayurveda
                            </p>

                        </div>

                        {/* Main Heading */}
                        <h1
                            className="
                                font-display
                                text-6xl
                                leading-[0.88]
                                tracking-[-0.025em]
                                sm:text-7xl
                                md:text-8xl
                                lg:text-[110px]
                            "
                        >
                            Return to
                            <br />
                            your roots.
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-7
                                max-w-lg
                                text-sm
                                leading-7
                                text-white/80
                                md:text-base
                            "
                        >
                            Ayurvedic-inspired rituals for hair and skin,
                            thoughtfully made with botanical ingredients
                            for everyday care.
                        </p>

                        {/* Buttons */}
                        <div className="mt-9 flex flex-wrap items-center gap-5">

                            {/* Primary CTA */}
                            <Link
                                to="/products"
                                className="
                                    inline-flex
                                    h-12
                                    items-center
                                    justify-center
                                    border
                                    border-white
                                    bg-transparent
                                    px-7
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:bg-white
                                    hover:text-forest-dark
                                "
                            >
                                Shop Collection
                            </Link>

                            {/* Secondary CTA */}
                            <Link
                                to="/products?category=Hair"
                                className="
                                    group
                                    inline-flex
                                    h-12
                                    items-center
                                    gap-3
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.2em]
                                    text-white
                                "
                            >
                                <span>
                                    Explore Hair
                                </span>

                                <span
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="
                    absolute
                    bottom-7
                    right-6
                    hidden
                    items-center
                    gap-3
                    text-white/65
                    md:right-10
                    md:flex
                "
            >
                <span
                    className="
                        text-[9px]
                        uppercase
                        tracking-[0.28em]
                    "
                >
                    Explore
                </span>

                <span className="h-px w-8 bg-white/50" />

                <span className="text-sm">
                    ↓
                </span>
            </div>

        </section>
    );
}