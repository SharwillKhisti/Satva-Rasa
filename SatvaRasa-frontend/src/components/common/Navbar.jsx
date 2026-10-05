import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur-sm">

            {/* Announcement */}
            <div className="bg-forest-dark text-cream text-center text-[10px] md:text-[11px] tracking-[0.2em] py-2.5 px-4 uppercase">
                Free shipping on orders over ₹999
            </div>

            {/* Main Navbar */}
            <div className="relative h-[72px] md:h-20 px-5 md:px-10 border-b border-bark/10 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center">

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((value) => !value)}
                        className="md:hidden p-2 -ml-2 text-bark hover:text-moss transition-colors duration-200"
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.16em]">
                        <NavLink to="/products">
                            Shop All
                        </NavLink>

                        <NavLink to="/products?category=Hair">
                            Hair
                        </NavLink>

                        <NavLink to="/products?category=Skin">
                            Skin
                        </NavLink>
                    </nav>
                </div>

                {/* Logo */}
                <Link
                    to="/"
                    className="absolute left-1/2 -translate-x-1/2 group"
                >
                    <span className="font-display text-[21px] md:text-[25px] tracking-[0.2em] uppercase text-forest-dark whitespace-nowrap transition-opacity duration-200 group-hover:opacity-70">
                        Satva Rasa
                    </span>
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4 md:gap-6 ml-auto">

                    {/* Search */}
                    <Link
                        to="/products"
                        aria-label="Search products"
                        className="hidden sm:flex items-center justify-center p-1 text-bark hover:text-moss transition-colors duration-200"
                    >
                        <SearchIcon />
                    </Link>

                    {/* Account */}
                    <Link
                        to="/login"
                        aria-label="Account"
                        className="flex items-center justify-center p-1 text-bark hover:text-moss transition-colors duration-200"
                    >
                        <UserIcon />
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
                        className="relative flex items-center justify-center p-1 text-bark hover:text-moss transition-colors duration-200"
                    >
                        <BagIcon />

                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-forest-dark text-cream text-[9px] font-medium flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden border-b border-bark/10 bg-sand transition-all duration-300 ${
    menuOpen
        ? "max-h-80 opacity-100"
        : "max-h-0 opacity-0 border-b-0"
}`}
            >
                <nav className="px-5 py-2">

                    <MobileNavLink
                        to="/products"
                        onClick={() => setMenuOpen(false)}
                    >
                        Shop All
                    </MobileNavLink>

                    <MobileNavLink
                        to="/products?category=Hair"
                        onClick={() => setMenuOpen(false)}
                    >
                        Hair
                    </MobileNavLink>

                    <MobileNavLink
                        to="/products?category=Skin"
                        onClick={() => setMenuOpen(false)}
                    >
                        Skin
                    </MobileNavLink>

                    <MobileNavLink
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        last
                    >
                        Account
                    </MobileNavLink>

                </nav>
            </div>
        </header>
    );
}

/* Desktop Navigation Link */

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="relative py-2 text-bark/80 transition-colors duration-200 hover:text-forest-dark group"
        >
            {children}

            <span className="absolute left-0 bottom-0 h-px w-0 bg-forest-dark transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

/* Mobile Navigation Link */

function MobileNavLink({
    to,
    children,
    onClick,
    last = false,
}) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center justify-between py-4 text-sm tracking-wide text-bark transition-colors duration-200 hover:text-moss ${
    !last ? "border-b border-bark/10" : ""
}`}
        >
            <span>{children}</span>

            <span className="text-bark/30 text-lg">
                →
            </span>
        </Link>
    );
}

/* Icons */

function MenuIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M4 7h16M4 12h16M4 17h16"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="11" cy="11" r="6.5" />
            <path
                d="m16 16 4 4"
                strokeLinecap="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="8" r="4" />
            <path
                d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M6 8h12l-1 12H7L6 8Z"
                strokeLinejoin="round"
            />
            <path
                d="M9 8V6a3 3 0 0 1 6 0v2"
                strokeLinecap="round"
            />
        </svg>
    );
}

