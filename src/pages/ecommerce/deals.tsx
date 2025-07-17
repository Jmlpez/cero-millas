import { Clock, Star, Tag, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ecommerce/product-card";
import { products } from "@/data/mock-products";

export const Deals = () => {
    // Mock deals data
    const flashDeals = products.slice(0, 4);
    const dailyDeals = products.slice(4, 8);
    const weeklyDeals = products.slice(8, 12);

    const dealCategories = [
        {
            name: "Electronics",
            discount: "Up to 60% off",
            color: "bg-blue-500",
        },
        { name: "Fashion", discount: "Up to 50% off", color: "bg-pink-500" },
        {
            name: "Home & Garden",
            discount: "Up to 40% off",
            color: "bg-green-500",
        },
        { name: "Beauty", discount: "Up to 45% off", color: "bg-purple-500" },
        { name: "Sports", discount: "Up to 35% off", color: "bg-orange-500" },
        { name: "Books", discount: "Up to 30% off", color: "bg-red-500" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            🔥 Amazing Deals & Offers
                        </h1>
                        <p className="text-xl text-red-100 mb-6">
                            Don't miss out on our biggest savings of the season!
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-lg">
                            <Clock className="w-5 h-5" />
                            <span>Limited time offers - Shop now!</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deal Categories */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        Shop by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {dealCategories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/category/${category.name.toLowerCase().replace(" & ", "-")}`}
                                className="group"
                            >
                                <div
                                    className={`${category.color} p-6 rounded-lg text-white text-center hover:shadow-lg transition-shadow`}
                                >
                                    <div className="mb-2">
                                        <Tag className="w-8 h-8 mx-auto" />
                                    </div>
                                    <h3 className="font-semibold mb-1">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        {category.discount}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Deals */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-3xl font-bold text-gray-900">
                                ⚡ Flash Deals
                            </h2>
                            <Badge className="bg-red-500 text-white">
                                <Clock className="w-3 h-3 mr-1" />
                                Limited Time
                            </Badge>
                        </div>
                        <Link to="/products">
                            <Button variant="outline">View All Deals</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {flashDeals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Deals */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-3xl font-bold text-gray-900">
                                📅 Daily Deals
                            </h2>
                            <Badge className="bg-blue-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Best Sellers
                            </Badge>
                        </div>
                        <Link to="/products">
                            <Button variant="outline">View All</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dailyDeals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Weekly Specials */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-3xl font-bold text-gray-900">
                                🎯 Weekly Specials
                            </h2>
                            <Badge className="bg-green-500 text-white">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                            </Badge>
                        </div>
                        <Link to="/products">
                            <Button variant="outline">View All</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {weeklyDeals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Never Miss a Deal!
                        </h2>
                        <p className="text-blue-100 mb-6">
                            Subscribe to our newsletter and be the first to know
                            about exclusive deals and offers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
