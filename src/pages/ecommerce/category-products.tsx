import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ecommerce/product-card";
import { getProductsByCategory, categories } from "@/data/mock-products";

export const EcommerceCategoryProducts = () => {
    const { slug } = useParams<{ slug: string }>();
    const category = categories.find((c) => c.slug === slug);
    const categoryProducts = getProductsByCategory(slug!);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState<string>("name");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        const filtered = categoryProducts.filter((product) => {
            // Price range filter
            if (
                product.price < priceRange[0] ||
                product.price > priceRange[1]
            ) {
                return false;
            }
            return true;
        });

        // Sort products
        switch (sortBy) {
            case "price-low":
                return filtered.sort((a, b) => a.price - b.price);
            case "price-high":
                return filtered.sort((a, b) => b.price - a.price);
            case "rating":
                return filtered.sort((a, b) => b.rating - a.rating);
            case "name":
            default:
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
    }, [categoryProducts, priceRange, sortBy]);

    const clearFilters = () => {
        setPriceRange([0, 1000]);
        setSortBy("name");
    };

    const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 1000;

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    Category Not Found
                </h1>
                <p className="text-slate-600 mb-8">
                    The category you're looking for doesn't exist.
                </p>
                <Button asChild>
                    <Link to="/categories">Browse Categories</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb */}
            <div className="bg-white py-4 border-b">
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
                            to="/categories"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Categories
                        </Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-600">{category.name}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/categories">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Categories
                            </Link>
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-4">
                                {category.name}
                            </h1>
                            <p className="text-lg text-slate-600 mb-6">
                                Discover our amazing collection of{" "}
                                {category.name.toLowerCase()} products. Quality
                                items at competitive prices with fast shipping.
                            </p>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-blue-100 text-blue-700">
                                    {categoryProducts.length} Products Available
                                </Badge>
                                <span className="text-slate-500">
                                    Updated daily
                                </span>
                            </div>
                        </div>
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
                        <p className="text-slate-600">
                            Showing {filteredProducts.length} of{" "}
                            {categoryProducts.length} products
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="rating">Highest Rated</option>
                            </select>

                            {/* View Mode */}
                            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                                <Button
                                    variant={
                                        viewMode === "grid"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="rounded-none"
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "list"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="rounded-none"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Filters Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden"
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside
                        className={`lg:block w-80 flex-shrink-0 ${showFilters ? "block" : "hidden"}`}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">
                                        Filters
                                    </h3>
                                    {hasActiveFilters && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearFilters}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Clear All
                                        </Button>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div className="mb-8">
                                    <h4 className="font-medium mb-4">
                                        Price Range
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setPriceRange([0, 50])
                                                }
                                                className={
                                                    priceRange[0] === 0 &&
                                                    priceRange[1] === 50
                                                        ? "bg-blue-100"
                                                        : ""
                                                }
                                            >
                                                Under $50
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setPriceRange([50, 100])
                                                }
                                                className={
                                                    priceRange[0] === 50 &&
                                                    priceRange[1] === 100
                                                        ? "bg-blue-100"
                                                        : ""
                                                }
                                            >
                                                $50-$100
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setPriceRange([100, 200])
                                                }
                                                className={
                                                    priceRange[0] === 100 &&
                                                    priceRange[1] === 200
                                                        ? "bg-blue-100"
                                                        : ""
                                                }
                                            >
                                                $100-$200
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setPriceRange([200, 1000])
                                                }
                                                className={
                                                    priceRange[0] === 200 &&
                                                    priceRange[1] === 1000
                                                        ? "bg-blue-100"
                                                        : ""
                                                }
                                            >
                                                Over $200
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Popular Tags in this category */}
                                <div>
                                    <h4 className="font-medium mb-4">
                                        Popular in {category.name}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(
                                            new Set(
                                                categoryProducts.flatMap(
                                                    (p) => p.tags
                                                )
                                            )
                                        )
                                            .slice(0, 8)
                                            .map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    className="bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>

                                {/* Brands in this category */}
                                <div className="mt-8">
                                    <h4 className="font-medium mb-4">Brands</h4>
                                    <div className="space-y-2">
                                        {Array.from(
                                            new Set(
                                                categoryProducts.map(
                                                    (p) => p.brand
                                                )
                                            )
                                        )
                                            .slice(0, 6)
                                            .map((brand) => (
                                                <div
                                                    key={brand}
                                                    className="flex items-center justify-between"
                                                >
                                                    <span className="text-slate-600">
                                                        {brand}
                                                    </span>
                                                    <Badge className="bg-slate-100 text-slate-600 text-xs">
                                                        {
                                                            categoryProducts.filter(
                                                                (p) =>
                                                                    p.brand ===
                                                                    brand
                                                            ).length
                                                        }
                                                    </Badge>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Products Grid/List */}
                    <main className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Filter className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        Try adjusting your filter criteria to
                                        find what you're looking for.
                                    </p>
                                    <Button onClick={clearFilters}>
                                        Clear Filters
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                        : "space-y-6"
                                }
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        className={
                                            viewMode === "list" ? "flex" : ""
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
