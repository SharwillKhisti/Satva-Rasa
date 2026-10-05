export default function Button({
                                   children,
                                   variant = "primary",
                                   className = "",
                                   disabled = false,
                                   ...props
                               }) {
    const variants = {
        primary:
            "bg-forest-dark text-white hover:bg-forest transition-colors",
        secondary:
            "border border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-white transition-colors",
        ghost:
            "text-forest-dark hover:text-moss transition-colors",
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={`px-6 py-3 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}