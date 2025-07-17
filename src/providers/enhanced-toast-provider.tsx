import { RadixToast, RadixToastProvider } from '@ui/toast/radix-toast';
import { Toast, ToastVariant } from '@ui/toast/toast';
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

export type EnhancedToastItem = {
    /**
     * Unique identifier for the toast item.
     */
    id: string;
    /**
     * Visual style variant of the toast.
     */
    variant?: ToastVariant;
    /**
     * Toast title for better UX and accessibility.
     */
    title?: string | React.ReactNode;
    /**
     * Detailed description or additional content.
     * Can include React content like JSX.
     */
    description?: string | React.ReactNode;
    /**
     * Toast notification duration (in seconds)
     * until it is automatically closed
     */
    duration?: number;
    /**
     * Show/Hide the progress bar
     */
    showProgress?: boolean;
};

interface EnhancedToastContextType {
    addToast: (toast: Omit<EnhancedToastItem, 'id'>) => void;
}

const EnhancedToastContext = createContext<EnhancedToastContextType | null>(null);

export const useEnhancedToast = () => {
    const context = useContext(EnhancedToastContext);
    if (!context) {
        throw new Error('useEnhancedToast must be used within an EnhancedToastProvider');
    }
    return context;
};

interface EnhancedToastProviderProps extends PropsWithChildren {
    /**
     * Which toast implementation to use
     * - 'portal': Custom implementation using React Portal
     * - 'radix': Radix UI Toast implementation (recommended)
     */
    implementation?: 'portal' | 'radix';
}

export const EnhancedToastProvider = ({ children, implementation = 'portal' }: EnhancedToastProviderProps) => {
    const [toasts, setToasts] = useState<EnhancedToastItem[]>([]);

    const addToast = useCallback((toast: Omit<EnhancedToastItem, 'id'>) => {
        const id = Math.random().toString();
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toastContent = (
        <EnhancedToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast Container */}
            {implementation === 'portal' ? (
                // Portal-based implementation with higher z-index
                <div style={{ isolation: 'isolate' }}>
                    {toasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                            stackPosition={index}
                        />
                    ))}
                </div>
            ) : (
                // Radix UI implementation
                <>
                    {toasts.map((toast, index) => (
                        <RadixToast
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                            stackPosition={index}
                        />
                    ))}
                </>
            )}
        </EnhancedToastContext.Provider>
    );

    // Wrap with RadixToastProvider if using Radix implementation
    if (implementation === 'radix') {
        return <RadixToastProvider>{toastContent}</RadixToastProvider>;
    }

    return toastContent;
};
