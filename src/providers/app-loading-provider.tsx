import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

interface AppLoadingContextType {
    isLoading: boolean;
    message: string;
    showLoader: (message?: string) => void;
    hideLoader: () => void;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(undefined);

export const useAppLoading = () => {
    const context = useContext(AppLoadingContext);
    if (!context) {
        throw new Error('useAppLoading must be used within AppLoadingProvider');
    }
    return context;
};

/**
 * Simplified AppLoadingProvider - Only for operation-specific loading
 * Initial app loading is handled by HTML loader
 */
export const AppLoadingProvider = ({ children }: PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('Cargando...');

    const showLoader = useCallback((loadingMessage?: string) => {
        if (loadingMessage) setMessage(loadingMessage);
        setIsLoading(true);
    }, []);

    const hideLoader = useCallback(() => {
        setIsLoading(false);
    }, []);

    const contextValue: AppLoadingContextType = useMemo(
        () => ({
            isLoading,
            message,
            showLoader,
            hideLoader,
        }),
        [hideLoader, isLoading, message, showLoader],
    );

    return <AppLoadingContext.Provider value={contextValue}>{children}</AppLoadingContext.Provider>;
};
