import { MessageCircle, Phone, Mail, Clock, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Support = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const faqItems = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by visiting the Track Order page and entering your order number and email address. You'll receive tracking information via email once your order ships."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some restrictions apply for certain product categories."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days. Free shipping is available on orders over $99."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location."
        },
        {
            question: "How can I change or cancel my order?",
            answer: "You can modify or cancel your order within 24 hours of placing it. After this period, please contact our customer service team for assistance."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely."
        }
    ];

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Chat with our support team",
            availability: "24/7 Available",
            action: "Start Chat",
            color: "bg-blue-500"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Call us at +1-800-NUVORA",
            availability: "Mon-Fri 9AM-6PM EST",
            action: "Call Now",
            color: "bg-green-500"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "support@nuvorastore.com",
            availability: "Response within 24 hours",
            action: "Send Email",
            color: "bg-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            How Can We Help You?
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            We're here to support you every step of the way
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search for help articles, FAQs, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-2 focus:ring-blue-300 bg-white text-gray-900"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Get in Touch
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <method.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                                <p className="text-gray-600 mb-2">{method.description}</p>
                                <div className="flex items-center justify-center mb-4">
                                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-500">{method.availability}</span>
                                </div>
                                <Button className={`${method.color} hover:opacity-90`}>
                                    {method.action}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Find quick answers to common questions
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-4">
                            {faqItems.map((faq, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <HelpCircle className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {faq.question}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Browse Help Topics
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Orders & Shipping", count: "12 articles", color: "bg-blue-500" },
                            { title: "Returns & Exchanges", count: "8 articles", color: "bg-green-500" },
                            { title: "Payment & Billing", count: "6 articles", color: "bg-purple-500" },
                            { title: "Account & Security", count: "10 articles", color: "bg-orange-500" },
                            { title: "Product Information", count: "15 articles", color: "bg-red-500" },
                            { title: "Technical Support", count: "9 articles", color: "bg-indigo-500" },
                            { title: "Promotions & Deals", count: "5 articles", color: "bg-pink-500" },
                            { title: "General Questions", count: "7 articles", color: "bg-gray-500" }
                        ].map((category, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                                    <HelpCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                                <Badge className="bg-gray-200 text-gray-800">{category.count}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Still Need Help?
                        </h2>
                        <p className="text-gray-300 mb-8">
                            Our support team is ready to assist you with any questions or concerns
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Contact Support
                            </Button>
                            <Button variant="outline" className="border-gray-300 text-gray-300 hover:bg-gray-700">
                                Submit a Ticket
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
