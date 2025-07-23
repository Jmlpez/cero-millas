import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Product } from "@/data/mock-products";

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    selectedVariant?: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, variant?: string) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("zeromiles-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem("zeromiles-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity = 1, variant?: string) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) =>
                    item.product.id === product.id &&
                    item.selectedVariant === variant
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === existingItem.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            const newItem: CartItem = {
                id: Date.now() + Math.random(), // Simple ID generation
                product,
                quantity,
                selectedVariant: variant,
            };

            return [...currentItems, newItem];
        });
    };

    const removeFromCart = (id: number) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== id)
        );
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = item.product.price; // Use the current price (already discounted)
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
