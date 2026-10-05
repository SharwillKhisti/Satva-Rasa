import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-forest-dark text-cream mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">

                <div className="md:col-span-2">
                    <h2 className="font-display text-2xl tracking-[0.2em] uppercase">
                        Satva Rasa
                    </h2>

                    <p className="mt-4 text-sm text-cream/70 leading-relaxed max-w-md">
                        Ayurvedic-inspired hair and skincare crafted with
                        thoughtfully selected botanical ingredients for
                        everyday rituals.
                    </p>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-cream/50 mb-4">
                        Shop
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/products" className="hover:text-white">
                                Shop All
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/products?category=Hair"
                                className="hover:text-white"
                            >
                                Hair
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/products?category=Skin"
                                className="hover:text-white"
                            >
                                Skin
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-cream/50 mb-4">
                        Account
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/login" className="hover:text-white">
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/cart" className="hover:text-white">
                                Cart
                            </Link>
                        </li>

                        <li>
                            <Link to="/checkout" className="hover:text-white">
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/50">
                    <span>
                        © {new Date().getFullYear()} Satva Rasa. All rights reserved.
                    </span>

                    <div className="flex gap-5">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Contact</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}