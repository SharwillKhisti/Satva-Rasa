export default function SearchBar({
                                      value,
                                      onChange,
                                  }) {
    return (
        <div className="relative">
            <input
                type="search"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Search products..."
                className="w-full md:w-56 px-4 py-2.5 pr-9 border border-bark/20 rounded-full bg-transparent text-sm outline-none focus:border-forest-dark"
            />

            {value && (
                <button
                    type="button"
                    onClick={() =>
                        onChange("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-bark/50 hover:text-bark"
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}