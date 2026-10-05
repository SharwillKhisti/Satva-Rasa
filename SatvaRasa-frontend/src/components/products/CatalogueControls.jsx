const categories = [
    "All",
    "Hair",
    "Skin",
];

export function CategoryTabs({
                                 active,
                                 onChange,
                             }) {
    return (
        <div className="flex items-center gap-5">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    onClick={() =>
                        onChange(category)
                    }
                    className={`text-sm pb-1 border-b transition-colors ${
                        active === category
                            ? "text-forest-dark border-forest-dark"
                            : "text-bark/50 border-transparent hover:text-forest-dark"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export function SortDropdown({
                                 value,
                                 onChange,
                             }) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="px-3 py-2 border border-bark/20 rounded-full bg-transparent text-sm text-bark outline-none"
            aria-label="Sort products"
        >
            <option value="featured">
                Featured
            </option>

            <option value="price-asc">
                Price: Low to High
            </option>

            <option value="price-desc">
                Price: High to Low
            </option>

            <option value="rating-desc">
                Rating: High to Low
            </option>

            <option value="name-asc">
                Name: A–Z
            </option>
        </select>
    );
}