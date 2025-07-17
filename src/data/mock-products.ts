export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    images: string[];
    rating: number;
    reviewCount: number;
    tags: string[];
    inStock: boolean;
    featured: boolean;
    brand: string;
    sku: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}

export const categories: Category[] = [
    {
        id: "1",
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
        productCount: 125,
    },
    {
        id: "2",
        name: "Fashion",
        slug: "fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        productCount: 89,
    },
    {
        id: "3",
        name: "Home & Garden",
        slug: "home-garden",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        productCount: 67,
    },
    {
        id: "4",
        name: "Sports & Fitness",
        slug: "sports-fitness",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        productCount: 43,
    },
    {
        id: "5",
        name: "Health & Beauty",
        slug: "health-beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
        productCount: 78,
    },
    {
        id: "6",
        name: "Books & Media",
        slug: "books-media",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
        productCount: 156,
    },
];

export const products: Product[] = [
    // Electronics
    {
        id: "1",
        name: "Premium Wireless Headphones",
        description:
            "High-quality wireless headphones with active noise cancellation, premium sound quality, and 30-hour battery life. Perfect for music lovers and professionals.",
        price: 299.99,
        originalPrice: 399.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
        ],
        rating: 4.8,
        reviewCount: 342,
        tags: ["wireless", "noise-cancelling", "premium"],
        inStock: true,
        featured: true,
        brand: "AudioTech",
        sku: "AT-WH-001",
    },
    {
        id: "2",
        name: "Smart Fitness Watch",
        description:
            "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
        price: 249.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1434493651957-74882f9bb2c8?w=500&h=500&fit=crop",
        ],
        rating: 4.6,
        reviewCount: 189,
        tags: ["fitness", "smartwatch", "health"],
        inStock: true,
        featured: true,
        brand: "FitTech",
        sku: "FT-SW-002",
    },
    {
        id: "3",
        name: "4K Ultra HD Monitor",
        description:
            "27-inch 4K Ultra HD monitor with IPS panel, 144Hz refresh rate, and professional color accuracy. Perfect for gaming and creative work.",
        price: 449.99,
        originalPrice: 549.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=500&fit=crop",
        ],
        rating: 4.7,
        reviewCount: 97,
        tags: ["4k", "gaming", "professional"],
        inStock: true,
        featured: false,
        brand: "DisplayMax",
        sku: "DM-4K-003",
    },

    // Fashion
    {
        id: "4",
        name: "Classic Denim Jacket",
        description:
            "Timeless denim jacket made from premium cotton with a comfortable fit. Perfect for casual and semi-formal occasions.",
        price: 89.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
        ],
        rating: 4.4,
        reviewCount: 156,
        tags: ["casual", "classic", "cotton"],
        inStock: true,
        featured: true,
        brand: "UrbanStyle",
        sku: "US-DJ-004",
    },
    {
        id: "5",
        name: "Luxury Leather Handbag",
        description:
            "Elegant leather handbag crafted from genuine Italian leather. Features multiple compartments and adjustable strap.",
        price: 199.99,
        originalPrice: 279.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=500&fit=crop",
        ],
        rating: 4.9,
        reviewCount: 73,
        tags: ["luxury", "leather", "italian"],
        inStock: true,
        featured: true,
        brand: "LuxBags",
        sku: "LB-LH-005",
    },

    // Home & Garden
    {
        id: "6",
        name: "Modern Coffee Table",
        description:
            "Sleek modern coffee table with glass top and oak wood base. Perfect centerpiece for contemporary living rooms.",
        price: 329.99,
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        ],
        rating: 4.5,
        reviewCount: 89,
        tags: ["modern", "glass", "oak"],
        inStock: true,
        featured: false,
        brand: "HomeDesign",
        sku: "HD-CT-006",
    },

    // Sports & Fitness
    {
        id: "7",
        name: "Professional Yoga Mat",
        description:
            "High-quality yoga mat with superior grip and cushioning. Made from eco-friendly materials. Perfect for all types of yoga and exercise.",
        price: 49.99,
        originalPrice: 69.99,
        category: "Sports & Fitness",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=500&h=500&fit=crop",
        ],
        rating: 4.6,
        reviewCount: 234,
        tags: ["yoga", "eco-friendly", "professional"],
        inStock: true,
        featured: true,
        brand: "ZenFit",
        sku: "ZF-YM-007",
    },

    // Health & Beauty
    {
        id: "8",
        name: "Organic Skincare Set",
        description:
            "Complete skincare routine with organic ingredients. Includes cleanser, toner, serum, and moisturizer for all skin types.",
        price: 79.99,
        category: "Health & Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
        ],
        rating: 4.7,
        reviewCount: 127,
        tags: ["organic", "skincare", "natural"],
        inStock: true,
        featured: true,
        brand: "PureGlow",
        sku: "PG-SS-008",
    },

    // Books & Media
    {
        id: "9",
        name: "Bestselling Novel Collection",
        description:
            "Collection of 5 bestselling novels from acclaimed authors. Perfect for book lovers and makes a great gift.",
        price: 59.99,
        originalPrice: 89.99,
        category: "Books & Media",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop",
        ],
        rating: 4.8,
        reviewCount: 95,
        tags: ["bestseller", "collection", "fiction"],
        inStock: true,
        featured: false,
        brand: "BookWorld",
        sku: "BW-NC-009",
    },

    // Additional Electronics
    {
        id: "10",
        name: "Wireless Gaming Mouse",
        description:
            "Precision wireless gaming mouse with RGB lighting, customizable buttons, and ultra-fast response time.",
        price: 79.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=500&h=500&fit=crop",
        ],
        rating: 4.5,
        reviewCount: 168,
        tags: ["gaming", "wireless", "rgb"],
        inStock: true,
        featured: false,
        brand: "GameTech",
        sku: "GT-WGM-010",
    },

    // Additional Fashion
    {
        id: "11",
        name: "Designer Sneakers",
        description:
            "Premium designer sneakers with comfortable sole and stylish design. Perfect for casual and athletic wear.",
        price: 159.99,
        originalPrice: 199.99,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
        ],
        rating: 4.6,
        reviewCount: 201,
        tags: ["designer", "comfortable", "athletic"],
        inStock: true,
        featured: true,
        brand: "StyleStep",
        sku: "SS-DS-011",
    },

    // Additional Home & Garden
    {
        id: "12",
        name: "Aromatic Candle Set",
        description:
            "Set of 6 luxury aromatic candles with different scents. Hand-poured with natural soy wax and cotton wicks.",
        price: 39.99,
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1602874801006-37ad391e6f86?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1602874801006-37ad391e6f86?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
        ],
        rating: 4.3,
        reviewCount: 78,
        tags: ["aromatic", "luxury", "soy-wax"],
        inStock: true,
        featured: false,
        brand: "ScentHouse",
        sku: "SH-ACS-012",
    },
];

// Helper functions
export const getFeaturedProducts = () =>
    products.filter((product) => product.featured);
export const getProductsByCategory = (categorySlug: string) =>
    products.filter(
        (product) =>
            product.category
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace("&", "") === categorySlug
    );
export const getProductById = (id: string) =>
    products.find((product) => product.id === id);
export const searchProducts = (query: string) =>
    products.filter(
        (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some((tag) =>
                tag.toLowerCase().includes(query.toLowerCase())
            )
    );
