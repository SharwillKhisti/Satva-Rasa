import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";

export default function BrandStatement() {
    return (
        <section className="relative min-h-[650px] overflow-hidden bg-forest-dark text-cream">

            {/* Atmospheric gradients */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-[600px]
                    w-[600px]
                    rounded-full
                    bg-[#AAB7A0]/20
                    blur-[140px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-40
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#D8D5E6]/15
                    blur-[130px]
                "
            />

            {/* Decorative botanical circle */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[8%]
                    top-[12%]
                    h-32
                    w-32
                    rounded-full
                    border
                    border-cream/15
                    md:h-48
                    md:w-48
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[12%]
                    top-[18%]
                    h-3
                    w-3
                    rounded-full
                    bg-[#E9DFAE]
                "
            />

            {/* Main content */}
            <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16">

                <div className="grid w-full items-center gap-12 lg:grid-cols-12">

                    {/* Text */}
                    <div className="relative z-20 lg:col-span-7">

                        <p className="mb-8 text-xs uppercase tracking-[0.22em] text-cream/50">
                            Satva Rasa
                        </p>

                        <h2
                            className="
                                max-w-4xl
                                font-display
                                text-5xl
                                leading-[0.92]
                                tracking-[-0.025em]
                                md:text-7xl
                                lg:text-[88px]
                            "
                        >
                            Rooted in nature.
                            <br />
                            <span className="italic text-[#C9D3C4]">
                                Inspired by Ayurveda.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-10
                                max-w-lg
                                text-sm
                                leading-7
                                text-cream/65
                                md:text-base
                            "
                        >
                            Satva Rasa brings Ayurvedic inspiration into
                            modern everyday care through thoughtfully selected
                            ingredients and purposeful formulations.
                        </p>

                        <Link
                            to="/products"
                            className="
                                group
                                mt-9
                                inline-flex
                                items-center
                                gap-4
                                border-b
                                border-cream/50
                                pb-3
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-cream
                                transition-all
                                duration-300
                                hover:border-cream
                            "
                        >
                            <span>
                                Explore the collection
                            </span>

                            <span
                                className="
                                    text-base
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>
                        </Link>

                    </div>

                    {/* Image */}
                    <div
                        className="
                            relative
                            hidden
                            lg:col-span-5
                            lg:block
                        "
                    >

                        {/* Color block behind image */}
                        <div
                            className="
                                absolute
                                -right-10
                                -top-10
                                h-48
                                w-48
                                bg-[#D8D5E6]/20
                            "
                        />

                        <div
                            className="
                                relative
                                ml-auto
                                h-[500px]
                                w-[360px]
                                overflow-hidden
                            "
                        >
                            <img
                                src={heroImage}
                                alt="Satva Rasa botanical care"
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    hover:scale-[1.03]
                                "
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
                        </div>

                        {/* Floating phrase */}
                        <div
                            className="
                                absolute
                                -bottom-5
                                -left-8
                                bg-[#E9DFAE]
                                px-6
                                py-5
                                text-forest-dark
                            "
                        >
                            <p className="font-display text-xl italic">
                                Return to your roots.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}