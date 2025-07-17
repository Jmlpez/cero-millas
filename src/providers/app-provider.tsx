import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { EnhancedToastProvider } from "./enhanced-toast-provider";
import { CartProvider } from "@/contexts/cart-context";

// TODO : Add global default configuration for error-handling
const queryClient = new QueryClient();

/**
 * AppProvider component that wraps the application with essential context providers.
 *
 * Providers included:
 * - QueryClientProvider: Provides a React Query client for managing server state.
 * - HelmetProvider: Manages changes to the document head.
 * - ThemeProvider: Provides theme context for styling and dark/light mode.
 * - CartProvider: Provides shopping cart context with localStorage persistence.
 * - EnhancedToastProvider: Provides toast notifications with Radix UI implementation.
 * - ReactQueryDevtools: Provides devtools for React Query.
 */
export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <ThemeProvider>
                    <CartProvider>
                        <EnhancedToastProvider implementation="radix">
                            {children}
                        </EnhancedToastProvider>
                    </CartProvider>
                </ThemeProvider>
            </HelmetProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
