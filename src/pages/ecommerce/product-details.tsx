import { ProductCarousel } from "@/components/ecommerce/product-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { getProductById, products } from "@/data/mock-products";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Minus,
    Plus,
    RotateCcw,
    Shield,
    ShoppingCart,
    Star,
    Truck,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

export const EcommerceProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const product = getProductById(id!);
    const { addToCart } = useCart();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    Product Not Found
                </h1>
                <p className="text-slate-600 mb-8">
                    The product you're looking for doesn't exist.
                </p>
                <Button asChild>
                    <Link to="/">Return Home</Link>
                </Button>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(
              ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
          )
        : 0;

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 8);

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-slate-50 py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Home
                        </Link>
                        <span className="text-slate-400">/</span>
                        <Link
                            to="/products"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Products
                        </Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-600">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div className="relative mb-4">
                            <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                                <img
                                    src={product.images[selectedImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image Navigation */}
                            {product.images.length > 1 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </>
                            )}

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {discount > 0 && (
                                    <Badge className="bg-red-500 text-white">
                                        -{discount}% OFF
                                    </Badge>
                                )}
                                {product.featured && (
                                    <Badge className="bg-blue-600 text-white">
                                        Featured
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setSelectedImageIndex(index)
                                        }
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImageIndex === index
                                                ? "border-blue-600"
                                                : "border-slate-200 hover:border-slate-300"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category */}
                        <p className="text-blue-600 text-sm font-medium mb-2">
                            {product.category}
                        </p>

                        {/* Product Name */}
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < Math.floor(product.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300"
                                        }`}
                                    />
                                ))}
                                <span className="text-slate-600 ml-2">
                                    {product.rating}
                                </span>
                            </div>
                            <span className="text-slate-500">
                                ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-slate-900">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-slate-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                            {discount > 0 && (
                                <Badge className="bg-green-100 text-green-800">
                                    Save $
                                    {(
                                        product.originalPrice! - product.price
                                    ).toFixed(2)}
                                </Badge>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">
                                Description
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <span className="text-sm text-slate-500">
                                    Brand
                                </span>
                                <p className="font-medium">{product.brand}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">
                                    SKU
                                </span>
                                <p className="font-medium">{product.sku}</p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">
                                    Availability
                                </span>
                                <p
                                    className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}
                                >
                                    {product.inStock
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">
                                    Category
                                </span>
                                <p className="font-medium">
                                    {product.category}
                                </p>
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center border border-slate-300 rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1)
                                            )
                                        }
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-4 py-2 min-w-[3rem] text-center">
                                        {quantity}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <span className="text-slate-600">
                                    Total: $
                                    {(product.price * quantity).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    disabled={!product.inStock}
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="px-4"
                                >
                                    <Heart
                                        className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <Truck className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-sm">
                                        Free Shipping
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        On orders over $99
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <RotateCcw className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-sm">
                                        Easy Returns
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        30-day return policy
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <Shield className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="font-medium text-sm">
                                        Secure Payment
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        SSL encrypted
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <ProductCarousel
                            title="Related Products"
                            products={relatedProducts}
                        />
                    </div>
                </section>
            )}
        </div>
    );
};
