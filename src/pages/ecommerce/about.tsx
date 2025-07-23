import { Check, Users, Award, Globe } from "lucide-react";

export const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Cero Millas
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Your trusted destination for quality products and
                            exceptional shopping experience since 2020
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Our Story
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Founded in 2020, Cero Millas began as a
                                    vision to create an exceptional online
                                    shopping experience. We believe that
                                    everyone deserves access to quality products
                                    at fair prices, delivered with outstanding
                                    customer service.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Today, we serve thousands of customers
                                    worldwide, offering carefully curated
                                    products across multiple categories, from
                                    electronics to home goods, fashion to beauty
                                    products.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            50K+
                                        </div>
                                        <div className="text-gray-600">
                                            Happy Customers
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            1000+
                                        </div>
                                        <div className="text-gray-600">
                                            Products
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            99%
                                        </div>
                                        <div className="text-gray-600">
                                            Satisfaction Rate
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            24/7
                                        </div>
                                        <div className="text-gray-600">
                                            Support
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Our Values
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Quality First
                                </h3>
                                <p className="text-gray-600">
                                    We carefully select every product to ensure
                                    it meets our high standards for quality and
                                    durability.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Customer Focused
                                </h3>
                                <p className="text-gray-600">
                                    Your satisfaction is our priority. We're
                                    here to help you find exactly what you need.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Global Reach
                                </h3>
                                <p className="text-gray-600">
                                    We deliver worldwide, bringing quality
                                    products to customers wherever they are.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            To make quality products accessible to everyone,
                            while providing an exceptional shopping experience
                            that exceeds expectations.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    What We Promise
                                </h3>
                                <ul className="space-y-3 text-left">
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Fast and reliable shipping
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Quality guarantee on all products
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Easy returns and exchanges
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            24/7 customer support
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Why Choose Us
                                </h3>
                                <ul className="space-y-3 text-left">
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Competitive prices
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Secure payment options
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Wide product selection
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                        <span className="text-gray-600">
                                            Trusted by thousands
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
