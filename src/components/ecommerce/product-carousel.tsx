import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ecommerce/product-card";
import { Product } from "@/data/mock-products";

interface ProductCarouselProps {
    title: string;
    products: Product[];
    className?: string;
}

export const ProductCarousel = ({
    title,
    products,
    className = "",
}: ProductCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Calculate how many products are visible based on screen size
    const getProductsPerView = () => {
        if (typeof window === "undefined") return 4;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 4;
    };

    const [productsPerView, setProductsPerView] =
        useState(getProductsPerView());

    useEffect(() => {
        const handleResize = () => {
            setProductsPerView(getProductsPerView());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        updateScrollButtons();
    }, [currentIndex, productsPerView]);

    const updateScrollButtons = () => {
        setCanScrollLeft(currentIndex > 0);
        setCanScrollRight(currentIndex < products.length - productsPerView);
    };

    const scrollLeft = () => {
        if (canScrollLeft) {
            setCurrentIndex((prev) => Math.max(0, prev - 1));
        }
    };

    const scrollRight = () => {
        if (canScrollRight) {
            setCurrentIndex((prev) =>
                Math.min(products.length - productsPerView, prev + 1)
            );
        }
    };

    const visibleProducts = products.slice(
        currentIndex,
        currentIndex + productsPerView
    );

    if (products.length === 0) {
        return null;
    }

    return (
        <section className={`${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

                {/* Navigation buttons */}
                {products.length > productsPerView && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div
                ref={scrollContainerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        className="w-full"
                    />
                ))}
            </div>

            {/* Dots indicator for mobile */}
            {products.length > productsPerView && (
                <div className="flex justify-center mt-6 gap-2 sm:hidden">
                    {Array.from(
                        {
                            length: Math.ceil(
                                products.length / productsPerView
                            ),
                        },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    setCurrentIndex(i * productsPerView)
                                }
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    Math.floor(
                                        currentIndex / productsPerView
                                    ) === i
                                        ? "bg-blue-600"
                                        : "bg-slate-300"
                                }`}
                            />
                        )
                    )}
                </div>
            )}
        </section>
    );
};
