import { useState, useMemo } from "react";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ecommerce/product-card";
import { products, categories } from "@/data/mock-products";

export const EcommerceProducts = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState<string>("name");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            // Search filter
            if (
                searchQuery &&
                !product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                !product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            // Category filter
            if (selectedCategory && product.category !== selectedCategory) {
                return false;
            }

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
    }, [searchQuery, selectedCategory, priceRange, sortBy]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setPriceRange([0, 1000]);
        setSortBy("name");
    };

    const hasActiveFilters =
        searchQuery ||
        selectedCategory ||
        priceRange[0] > 0 ||
        priceRange[1] < 1000;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                All Products
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Showing {filteredProducts.length} of{" "}
                                {products.length} products
                            </p>
                        </div>

                        {/* Search and Controls */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10 w-full sm:w-64"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            </div>

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

                                {/* Categories */}
                                <div className="mb-8">
                                    <h4 className="font-medium mb-4">
                                        Categories
                                    </h4>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() =>
                                                setSelectedCategory("")
                                            }
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                                !selectedCategory
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-slate-100"
                                            }`}
                                        >
                                            All Categories
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.name
                                                    )
                                                }
                                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                                    selectedCategory ===
                                                    category.name
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "hover:bg-slate-100"
                                                }`}
                                            >
                                                {category.name}
                                                <Badge className="ml-2 text-xs bg-slate-100 text-slate-700">
                                                    {
                                                        products.filter(
                                                            (p) =>
                                                                p.category ===
                                                                category.name
                                                        ).length
                                                    }
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-8">
                                    <h4 className="font-medium mb-4">
                                        Price Range
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange[0]}
                                                onChange={(e) =>
                                                    setPriceRange([
                                                        Number(e.target.value),
                                                        priceRange[1],
                                                    ])
                                                }
                                                className="w-24"
                                            />
                                            <span>-</span>
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange[1]}
                                                onChange={(e) =>
                                                    setPriceRange([
                                                        priceRange[0],
                                                        Number(e.target.value),
                                                    ])
                                                }
                                                className="w-24"
                                            />
                                        </div>
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

                                {/* Popular Tags */}
                                <div>
                                    <h4 className="font-medium mb-4">
                                        Popular Tags
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(
                                            new Set(
                                                products.flatMap((p) => p.tags)
                                            )
                                        )
                                            .slice(0, 10)
                                            .map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() =>
                                                        setSearchQuery(tag)
                                                    }
                                                    className="inline-block"
                                                >
                                                    <Badge className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 bg-slate-100 text-slate-700">
                                                        {tag}
                                                    </Badge>
                                                </button>
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
                                        <Search className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        Try adjusting your search or filter
                                        criteria to find what you're looking
                                        for.
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
