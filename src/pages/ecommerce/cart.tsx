import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

export const Cart = () => {
    const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
        useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center py-16">
                        <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-8" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any items to your cart
                            yet.
                        </p>
                        <Link to="/products">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                    <Button
                        variant="outline"
                        onClick={clearCart}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                        Clear Cart
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Cart Items ({items.length})
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Brand: {item.product.brand}
                                            </p>
                                            {item.selectedVariant && (
                                                <Badge className="bg-gray-100 text-gray-800 mb-2">
                                                    {item.selectedVariant}
                                                </Badge>
                                            )}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    $
                                                    {item.product.price.toFixed(
                                                        2
                                                    )}
                                                </span>
                                                {item.product.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        $
                                                        {item.product.originalPrice.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-12 text-center font-medium">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-gray-900">
                                                $
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                                            >
                                                <X className="w-4 h-4 mr-1" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>
                                    <span className="font-medium">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="font-medium">
                                        {getTotalPrice() > 99
                                            ? "FREE"
                                            : "$9.99"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">
                                        ${(getTotalPrice() * 0.08).toFixed(2)}
                                    </span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>
                                            $
                                            {(
                                                getTotalPrice() +
                                                (getTotalPrice() > 99
                                                    ? 0
                                                    : 9.99) +
                                                getTotalPrice() * 0.08
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            <div className="mt-4 text-center">
                                <Link
                                    to="/products"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Continue Shopping
                                </Link>
                            </div>

                            {getTotalPrice() < 99 && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Add ${(99 - getTotalPrice()).toFixed(2)}{" "}
                                        more for free shipping!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
