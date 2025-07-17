import { LucideLoader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AppLoaderProps {
    /** Show the loader */
    isLoading: boolean;
    /** Minimum time to show loader (prevents flash) */
    minimumLoadTime?: number;
    /** Custom loading message */
    message?: string;
}

/**
 * AppLoader component for showing loading states within the React app
 * This works in conjunction with the initial HTML loader
 */
export const AppLoader = ({ isLoading, minimumLoadTime = 800, message = 'Cargando...' }: AppLoaderProps) => {
    const [shouldShow, setShouldShow] = useState(isLoading);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        if (!isLoading) {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minimumLoadTime - elapsed);

            const timer = setTimeout(() => {
                setShouldShow(false);
            }, remaining);

            return () => clearTimeout(timer);
        } else {
            setShouldShow(true);
        }
    }, [isLoading, minimumLoadTime, startTime]);

    if (!shouldShow) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            {/* Logo with enhanced animation */}
            <div className="mb-6">
                <div className="relative">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/images/logo/89m.svg`}
                        alt="89 millas"
                        className="h-24 w-24 animate-pulse drop-shadow-lg filter"
                        onError={(e) => {
                            // Fallback if logo fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 -z-10 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
                </div>
            </div>

            {/* Loading Message with better typography */}
            <div className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-100">{message}</div>

            {/* Enhanced Spinner */}
            <div className="relative mb-6">
                <LucideLoader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                {/* Secondary ring */}
                <div className="absolute inset-0 h-10 w-10 animate-ping rounded-full border-2 border-blue-400/30" />
            </div>

            {/* Enhanced progress indicator */}
            <div className="w-72">
                <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Cargando componentes...</span>
                    <span className="animate-pulse">●●●</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                        style={{
                            animation: 'loading-progress 2s ease-in-out infinite',
                        }}
                    />
                </div>
            </div>

            {/* Subtle floating particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="animate-float absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-blue-400/30"
                    style={{ animationDelay: '0s' }}
                />
                <div
                    className="animate-float absolute top-1/3 right-1/4 h-1 w-1 rounded-full bg-blue-300/40"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="animate-float absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-blue-500/20"
                    style={{ animationDelay: '2s' }}
                />
            </div>

            {/* Inline styles for animation */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes loading-progress {
                        0% { width: 0%; }
                        50% { width: 70%; }
                        100% { width: 100%; }
                    }
                    @keyframes animate-float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                        50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
                    }
                    .animate-float {
                        animation: animate-float 3s ease-in-out infinite;
                    }
                `,
                }}
            />
        </div>
    );
};

/**
 * Hook to manage app-wide loading states
 */
export const useAppLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('Cargando...');

    const showLoader = (loadingMessage?: string) => {
        if (loadingMessage) setMessage(loadingMessage);
        setIsLoading(true);
    };

    const hideLoader = () => {
        setIsLoading(false);
    };

    return {
        isLoading,
        message,
        showLoader,
        hideLoader,
        AppLoader: (props: Omit<AppLoaderProps, 'isLoading' | 'message'>) => (
            <AppLoader
                {...props}
                isLoading={isLoading}
                message={message}
            />
        ),
    };
};
