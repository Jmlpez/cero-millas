import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/data/mock-products";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export const ProductCard = ({ product, className = "" }: ProductCardProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const discount = product.originalPrice
        ? Math.round(
              ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
          )
        : 0;

    return (
        <Card
            className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
        >
            <div className="relative overflow-hidden">
                {/* Product Image */}
                <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-slate-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy"
                        />
                        {!imageLoaded && (
                            <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
                                <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {discount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs font-medium">
                            -{discount}%
                        </Badge>
                    )}
                    {product.featured && (
                        <Badge className="bg-blue-600 text-white text-xs font-medium">
                            Featured
                        </Badge>
                    )}
                    {!product.inStock && (
                        <Badge className="bg-red-500 text-white text-xs font-medium">
                            Out of Stock
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => setIsLiked(!isLiked)}
                >
                    <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-slate-600"}`}
                    />
                </Button>

                {/* Quick Add to Cart (on hover) */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={!product.inStock}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>

            <CardContent className="p-4">
                {/* Category */}
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">
                    {product.category}
                </p>

                {/* Product Name */}
                <Link to={`/products/${product.id}`}>
                    <h3 className="font-medium text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${
                                    i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-slate-300"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-500">
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Brand */}
                <p className="text-xs text-slate-500 mt-1">
                    by {product.brand}
                </p>
            </CardContent>
        </Card>
    );
};
