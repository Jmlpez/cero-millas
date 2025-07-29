import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const WhatsAppFloat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const whatsappNumber = "+1234567890"; // Replace with your WhatsApp number

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(
            "Hello! I'm interested in your products from Zero Miles."
        );
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(url, "_blank");
    };

    return (
        <>
            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    size="sm"
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <MessageCircle className="w-6 h-6 text-white" />
                    )}
                </Button>
            </div>

            {/* WhatsApp Chat Widget */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-green-500 text-white p-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Cero Millas</h3>
                                <p className="text-sm text-green-100">
                                    We're here to help!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-800">
                                👋 Hello! Welcome to Las Millas. How can we
                                help you today?
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-green-500 hover:bg-green-600 text-white justify-start"
                                size="sm"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Chat with us on WhatsApp
                            </Button>
                            <div className="text-xs text-gray-500 text-center">
                                We typically reply within a few minutes
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
