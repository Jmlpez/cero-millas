import { Check, Users, Award, Globe } from "lucide-react";

export const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Las Millas
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            We're closer than any other store - bringing quality
                            products right to your doorstep with unmatched
                            convenience since 2020
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
                                    Founded in 2020, Las Millas was born from a
                                    simple idea: why should distance matter when
                                    shopping? We set out to be the closest store
                                    to every customer, eliminating the gap
                                    between what you want and what you can get.
                                    No matter where you are, we're always zero
                                    miles away.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Today, we've made that vision a reality by
                                    bringing thousands of quality products
                                    closer to customers worldwide. Through
                                    innovative logistics, personalized service,
                                    and a commitment to convenience, we've
                                    redefined what it means to shop online.
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
                                    Closer to You
                                </h3>
                                <p className="text-gray-600">
                                    We leverage cutting-edge logistics and local
                                    partnerships to bring products closer to you
                                    than ever before.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Zero Distance Service
                                </h3>
                                <p className="text-gray-600">
                                    Our personalized approach makes you feel
                                    like we're right next door, ready to help
                                    whenever you need us.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Instant Accessibility
                                </h3>
                                <p className="text-gray-600">
                                    No matter where you are in the world, we
                                    bring the store experience directly to you
                                    with lightning speed.
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
                            To eliminate the distance between customers and the
                            products they love, making shopping feel effortless
                            and personal, as if your favorite store was always
                            just around the corner.
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
                                            Lightning-fast delivery
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
                                            Always available support
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
                                            Closer than competitors
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
                                            Zero-distance shopping experience
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
