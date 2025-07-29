import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { Link } from "react-router";

export const EcommerceFooter = () => {
    return (
        <footer className="bg-slate-900 text-white">
            {/* Newsletter Section */}
            <div className="bg-slate-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-slate-300">
                                Subscribe to get special offers, new arrivals
                                and exclusive deals.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg text-slate-900 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    M
                                </span>
                            </div>
                            <span className="text-xl font-bold">
                                Las Millas
                            </span>
                        </div>
                        <p className="text-slate-300 mb-4">
                            Your trusted destination for quality products at
                            amazing prices. We're committed to providing
                            exceptional shopping experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/deals"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Special Deals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Customer Service
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shipping"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/returns"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/track-order"
                                    className="text-slate-300 hover:text-white transition-colors"
                                >
                                    Track Your Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Contact Info
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-300">
                                    123 Commerce Street, Business District, NY
                                    10001
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-300">
                                    +1 (555) 123-4567
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-300">
                                    support@themiles.com
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-400 text-sm">
                                <strong>Business Hours:</strong>
                                <br />
                                Mon - Fri: 9:00 AM - 8:00 PM
                                <br />
                                Sat - Sun: 10:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-slate-400 text-sm mb-2 md:mb-0">
                            © 2025 Las Millas. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm">
                            <Link
                                to="/privacy"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/cookies"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
