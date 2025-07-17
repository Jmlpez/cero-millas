import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

export const EcommerceHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { getTotalItems } = useCart();

    const cartItemCount = getTotalItems();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            {/* Top bar */}
            <div className="bg-slate-900 text-white text-sm">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center">
                        <span>Free shipping on orders over $99</span>
                        <div className="flex space-x-4">
                            <Link
                                to="/support"
                                className="hover:text-slate-300"
                            >
                                Support
                            </Link>
                            <Link
                                to="/track-order"
                                className="hover:text-slate-300"
                            >
                                Track Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                N
                            </span>
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            Nuvora Store
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-slate-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/categories"
                            className="text-slate-700 hover:text-blue-600 font-medium"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/products"
                            className="text-slate-700 hover:text-blue-600 font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            to="/deals"
                            className="text-slate-700 hover:text-blue-600 font-medium"
                        >
                            Deals
                        </Link>
                        <Link
                            to="/about"
                            className="text-slate-700 hover:text-blue-600 font-medium"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Account */}
                        {/* <Button
                            variant="ghost"
                            size="sm"
                            className="hidden md:flex items-center space-x-1"
                        >
                            <User className="h-4 w-4" />
                            <span>Account</span>
                        </Button> */}

                        {/* Cart */}
                        <Link to="/cart">
                            <Button variant="ghost" size="sm" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                                        {cartItemCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t pt-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/categories"
                                className="text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            <Link
                                to="/products"
                                className="text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                to="/deals"
                                className="text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Deals
                            </Link>
                            <Link
                                to="/about"
                                className="text-slate-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/account"
                                className="text-slate-700 hover:text-blue-600 font-medium flex items-center space-x-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>Account</span>
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};
