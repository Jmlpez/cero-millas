import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCarousel } from "@/components/ecommerce/product-carousel";
import {
    getFeaturedProducts,
    products,
    categories,
} from "@/data/mock-products";

export const Home = () => {
    const featuredProducts = getFeaturedProducts();
    const newArrivals = products.slice(0, 8);
    const bestSellers = products.filter((p) => p.rating >= 4.6).slice(0, 8);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Discover Amazing Products at{" "}
                                <span className="text-yellow-400">
                                    Unbeatable Prices
                                </span>
                            </h1>
                            <p className="text-xl mb-8 text-blue-100">
                                Shop from thousands of products across multiple
                                categories. Quality guaranteed, fast shipping,
                                and exceptional customer service.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50"
                                >
                                    Shop Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-blue-600"
                                >
                                    Explore Categories
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                                alt="Shopping"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold">
                                        4.9/5 Rating
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600">
                                    From 10,000+ customers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Free Shipping
                            </h3>
                            <p className="text-slate-600">
                                Free shipping on orders over $99. Fast and
                                reliable delivery worldwide.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Secure Payment
                            </h3>
                            <p className="text-slate-600">
                                Your payment information is safe and secure with
                                our encrypted checkout.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HeadphonesIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                24/7 Support
                            </h3>
                            <p className="text-slate-600">
                                Get help whenever you need it with our
                                round-the-clock customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Explore our wide range of categories and find
                            exactly what you're looking for
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/categories/${category.slug}`}
                                className="group text-center"
                            >
                                <div className="aspect-square overflow-hidden rounded-2xl mb-4 bg-slate-100 group-hover:shadow-lg transition-shadow">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {category.productCount} items
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Carousel */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <ProductCarousel
                        title="Featured Products"
                        products={featuredProducts}
                    />
                </div>
            </section>

            {/* New Arrivals Carousel */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <ProductCarousel
                        title="New Arrivals"
                        products={newArrivals}
                    />
                </div>
            </section>

            {/* Best Sellers Carousel */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <ProductCarousel
                        title="Best Sellers"
                        products={bestSellers}
                    />
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Stay in the Loop
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Be the first to know about new arrivals, exclusive
                        deals, and special promotions. Join our newsletter and
                        never miss out!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
