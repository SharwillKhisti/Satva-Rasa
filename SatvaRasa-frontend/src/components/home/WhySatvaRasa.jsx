const values = [
    {
        number: "01",
        title: "Rooted in Ayurveda",
        description:
            "Inspired by traditional Ayurvedic ingredients and principles, thoughtfully adapted for everyday care.",
    },
    {
        number: "02",
        title: "Ingredient Focused",
        description:
            "Every formulation puts its ingredients at the centre, with clear information about what goes into each product.",
    },
    {
        number: "03",
        title: "Made for Everyday Care",
        description:
            "Simple hair and skincare products designed to become a natural part of your everyday routine.",
    },
];

export default function WhySatvaRasa() {
    return (
        <section
            className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-cream
                via-[#F5F0E9]
                to-[#E7E2EE]
                px-6
                py-20
                md:px-10
                md:py-28
            "
        >
            {/* Soft decorative atmosphere */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#D9D9E8]/50
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    left-1/3
                    h-64
                    w-64
                    rounded-full
                    bg-[#E9D5CC]/30
                    blur-3xl
                "
            />

            {/* Botanical leaf — top right */}
            <svg
                className="
                    pointer-events-none
                    absolute
                    -right-3
                    top-8
                    h-48
                    w-48
                    rotate-[18deg]
                    text-forest-dark/10
                    md:right-8
                    md:top-12
                    md:h-64
                    md:w-64
                "
                viewBox="0 0 240 240"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M28 210C66 160 101 113 183 32"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />

                <path
                    d="M62 166C48 136 50 109 65 88C87 105 93 130 81 151"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M94 131C83 101 91 72 111 53C129 76 128 101 112 119"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M127 98C124 70 137 47 160 34C171 58 163 80 145 94"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M55 177C83 177 103 164 112 143"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            </svg>

            {/* Botanical leaf — bottom left */}
            <svg
                className="
                    pointer-events-none
                    absolute
                    -bottom-10
                    -left-6
                    h-52
                    w-52
                    -rotate-[18deg]
                    text-forest-dark/10
                    md:bottom-0
                    md:left-4
                    md:h-64
                    md:w-64
                "
                viewBox="0 0 240 240"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M22 211C67 175 104 131 179 42"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />

                <path
                    d="M55 182C34 158 32 133 42 111C67 124 76 147 67 168"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M88 148C66 124 66 97 79 77C103 94 110 116 99 137"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M121 111C104 87 109 61 126 43C148 63 150 84 136 103"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M49 190C75 189 97 176 108 156"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            </svg>

            {/* Tiny floating leaf — left */}
            <svg
                className="
                    pointer-events-none
                    absolute
                    left-[8%]
                    top-[22%]
                    hidden
                    h-20
                    w-20
                    rotate-[-25deg]
                    text-forest-dark/10
                    lg:block
                "
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M15 67C28 48 40 32 63 13"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                />

                <path
                    d="M27 50C18 43 17 34 20 27C29 31 34 39 31 46"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M40 36C34 28 36 20 42 15C49 22 48 29 44 34"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Tiny decorative dots */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[20%]
                    bottom-[18%]
                    h-2
                    w-2
                    rounded-full
                    bg-[#C98268]/30
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[18%]
                    top-[15%]
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#AAB7A0]/50
                "
            />

            {/* Main content */}
            <div className="relative mx-auto max-w-6xl">

                {/* Intro */}
                <div className="relative mb-16 max-w-2xl">

                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-moss">
                        The Satva Rasa Approach
                    </p>

                    <h2
                        className="
                            font-display
                            text-4xl
                            leading-[1.05]
                            tracking-[-0.02em]
                            text-forest-dark
                            md:text-5xl
                        "
                    >
                        Simple care,
                        <br className="hidden sm:block" />
                        <span className="italic">
                            rooted in tradition.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-sm
                            leading-7
                            text-bark/65
                            md:text-base
                        "
                    >
                        We bring together the wisdom of Ayurveda and
                        thoughtful modern formulation to create everyday
                        hair and skincare essentials.
                    </p>

                </div>

                {/* Principles */}
                <div className="grid border-y border-bark/15 md:grid-cols-3">

                    {values.map((value) => (
                        <div
                            key={value.number}
                            className="
                                group
                                relative
                                border-b
                                border-bark/15
                                py-9
                                transition-all
                                duration-300
                                last:border-b-0
                                hover:bg-white/25
                                md:border-b-0
                                md:border-l
                                md:px-8
                                md:py-10
                                first:border-l-0
                                md:first:pl-0
                            "
                        >
                            {/* Number + decorative line */}
                            <div className="flex items-center gap-3">

                                <span
                                    className="
                                        font-display
                                        text-lg
                                        italic
                                        text-moss
                                    "
                                >
                                    {value.number}
                                </span>

                                <span
                                    className="
                                        h-px
                                        w-8
                                        bg-bark/20
                                        transition-all
                                        duration-500
                                        group-hover:w-14
                                    "
                                />

                            </div>

                            <h3
                                className="
                                    mt-7
                                    max-w-xs
                                    font-display
                                    text-2xl
                                    leading-tight
                                    text-forest-dark
                                "
                            >
                                {value.title}
                            </h3>

                            <p
                                className="
                                    mt-4
                                    max-w-sm
                                    text-sm
                                    leading-6
                                    text-bark/65
                                "
                            >
                                {value.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}