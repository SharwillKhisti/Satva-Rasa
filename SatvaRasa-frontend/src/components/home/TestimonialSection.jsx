import heroImage from "../../assets/hero.jpg";

export default function TestimonialSection() {
    return (
        <section className="relative overflow-hidden bg-[#F1EEE6]">

            {/* Background gradient */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#D9D9E8]/40
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-40
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-[#E9D5CC]/40
                    blur-[100px]
                "
            />

            <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">

                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

                    {/* Image */}
                    <div className="relative">

                        {/* Decorative background shape */}
                        <div
                            className="
                                absolute
                                -bottom-6
                                -left-6
                                h-32
                                w-32
                                rounded-full
                                bg-[#D8D5E6]/70
                                blur-2xl
                            "
                        />

                        <div className="relative aspect-[4/5] overflow-hidden">

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

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-forest-dark/30
                                    via-transparent
                                    to-transparent
                                "
                            />

                        </div>

                        {/* Small floating label */}
                        <div
                            className="
                                absolute
                                -bottom-5
                                right-5
                                bg-[#E9DFAE]
                                px-5
                                py-4
                                md:right-8
                            "
                        >
                            <p className="font-display text-lg italic text-forest-dark">
                                Nature first.
                            </p>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="relative lg:py-10">

                        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-moss">
                            Our Approach
                        </p>

                        <blockquote
                            className="
                                max-w-xl
                                font-display
                                text-4xl
                                leading-[1.08]
                                tracking-[-0.02em]
                                text-forest-dark
                                md:text-5xl
                            "
                        >
                            Care begins with understanding what goes into
                            the products we use every day.
                        </blockquote>

                        <div className="mt-8 flex items-center gap-4">

                            <span className="h-px w-10 bg-forest-dark/25" />

                            <p className="text-sm text-bark/60">
                                The Satva Rasa philosophy
                            </p>

                        </div>

                        <div className="mt-12 max-w-md">
                            <p className="text-sm leading-7 text-bark/65 md:text-base">
                                We believe everyday care should begin with
                                knowing what you put on your hair and skin.
                                Our approach brings together Ayurvedic
                                inspiration, botanical ingredients and
                                thoughtful modern formulation.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}