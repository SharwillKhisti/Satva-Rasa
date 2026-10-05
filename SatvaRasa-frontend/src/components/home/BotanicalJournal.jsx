const ingredients = [
    {
        name: "Neem",
        type: "Purifying",
        description:
            "A traditional botanical valued for its clarifying qualities.",
        className: "bg-[#DDE5D8]",
    },
    {
        name: "Amla",
        type: "Nourishing",
        description:
            "An Ayurvedic favourite traditionally used in hair care.",
        className: "bg-[#E7E9D7]",
    },
    {
        name: "Bhringraj",
        type: "Hair Ritual",
        description:
            "A classic herb associated with traditional hair rituals.",
        className: "bg-[#D2DED0]",
    },
    {
        name: "Rose",
        type: "Soothing",
        description:
            "A delicate botanical chosen for gentle skin rituals.",
        className: "bg-[#E9D5CF]",
    },
    {
        name: "Saffron",
        type: "Radiance",
        description:
            "A precious botanical celebrated in Ayurvedic skincare.",
        className: "bg-[#EDE7C8]",
    },
    {
        name: "Sandalwood",
        type: "Balancing",
        description:
            "A timeless Ayurvedic ingredient with a warm character.",
        className: "bg-[#E4D9C8]",
    },
];

export default function BotanicalJournal() {
    return (
        <section className="relative overflow-hidden bg-cream">

            {/* Soft green botanical background */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#AAB7A0]/20
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -right-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#D9D9E8]/30
                    blur-3xl
                "
            />

            {/* Decorative botanical branch */}
            <div className="pointer-events-none absolute -left-8 top-8 hidden opacity-30 md:block">
                <LeafBranch />
            </div>

            <div className="pointer-events-none absolute -right-8 bottom-0 hidden rotate-180 opacity-20 md:block">
                <LeafBranch />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">

                {/* Heading */}
                <div className="mb-14 max-w-2xl">

                    <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-moss">
                        The Botanical Journal
                    </p>

                    <h2
                        className="
                            font-display
                            text-5xl
                            leading-[0.95]
                            tracking-[-0.02em]
                            text-forest-dark
                            md:text-7xl
                        "
                    >
                        The plants behind
                        <br />
                        <span className="italic text-forest">
                            the ritual.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-lg text-sm leading-7 text-bark/60 md:text-base">
                        We look to the botanicals at the heart of traditional
                        Indian rituals and bring their inspiration into
                        everyday hair and skincare.
                    </p>

                </div>

                {/* Ingredient grid */}
                <div className="grid border-t border-bark/10 sm:grid-cols-2 lg:grid-cols-3">

                    {ingredients.map((ingredient, index) => (
                        <div
                            key={ingredient.name}
                            className={`
                                group
                                relative
                                min-h-[250px]
                                overflow-hidden
                                border-b
                                border-bark/10
                                p-7
                                transition-all
                                duration-500
                                hover:brightness-[0.98]
                                lg:min-h-[280px]
                                ${index % 3 !== 0 ? "lg:border-l" : ""}
                                ${index % 2 !== 0 ? "sm:border-l lg:border-l" : ""}
                            `}
                        >
                            {/* Soft colour block */}
                            <div
                                className={`
                                    absolute
                                    inset-0
                                    opacity-70
                                    transition-transform
                                    duration-700
                                    group-hover:scale-[1.03]
                                    ${ingredient.className}
                                `}
                            />

                            {/* Subtle green wash */}
                            <div className="absolute inset-0 bg-[#F1EEE6]/25" />

                            {/* Leaf decoration */}
                            <div className="absolute right-5 top-5 opacity-20 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                                <SmallLeaf />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex min-h-[196px] flex-col justify-between">

                                <div>
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-forest/55">
                                        {ingredient.type}
                                    </span>

                                    <h3
                                        className="
                                            mt-3
                                            font-display
                                            text-4xl
                                            leading-none
                                            text-forest-dark
                                            md:text-5xl
                                        "
                                    >
                                        {ingredient.name}
                                    </h3>
                                </div>

                                <div>
                                    <span className="mb-4 block h-px w-8 bg-forest/25 transition-all duration-500 group-hover:w-14" />

                                    <p className="max-w-xs text-sm leading-6 text-bark/60">
                                        {ingredient.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom line */}
                <div className="mt-8 flex items-center justify-between border-t border-bark/10 pt-5">

                    <p className="font-display text-xl italic text-forest">
                        From nature, into the ritual.
                    </p>

                    <span className="hidden text-[9px] uppercase tracking-[0.2em] text-moss sm:block">
                        Satva Rasa
                    </span>

                </div>

            </div>
        </section>
    );
}

function LeafBranch() {
    return (
        <svg
            width="220"
            height="320"
            viewBox="0 0 220 320"
            fill="none"
            aria-hidden="true"
            className="text-forest"
        >
            <path
                d="M20 305C62 240 92 170 195 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M58 245C28 237 15 214 19 187C47 193 65 211 65 233Z"
                fill="currentColor"
            />

            <path
                d="M84 198C54 187 44 162 51 139C77 147 91 166 89 187Z"
                fill="currentColor"
            />

            <path
                d="M111 150C84 135 79 109 89 88C113 99 124 120 119 141Z"
                fill="currentColor"
            />

            <path
                d="M138 106C119 88 120 64 135 46C154 62 157 83 148 100Z"
                fill="currentColor"
            />

            <path
                d="M164 66C153 44 160 25 177 13C188 33 185 52 172 64Z"
                fill="currentColor"
            />
        </svg>
    );
}

function SmallLeaf() {
    return (
        <svg
            width="70"
            height="80"
            viewBox="0 0 70 80"
            fill="none"
            aria-hidden="true"
            className="text-forest"
        >
            <path
                d="M8 73C25 51 40 31 61 8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            <path
                d="M23 53C13 48 10 39 13 31C23 35 28 43 27 50Z"
                fill="currentColor"
            />

            <path
                d="M38 36C29 29 30 20 35 14C44 21 46 28 42 35Z"
                fill="currentColor"
            />

            <path
                d="M52 21C48 14 50 7 57 3C63 10 61 17 56 21Z"
                fill="currentColor"
            />
        </svg>
    );
}