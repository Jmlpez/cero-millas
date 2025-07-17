import { useEffect } from 'react';

/**
 * Simple component that just hides the HTML loader when React is ready
 * and renders the AppLoader when needed for specific operations
 */
export const AppLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Hide HTML loader when React is ready
        const timer = setTimeout(() => {
            document.body.classList.add('app-loaded');
        }, 100); // Small delay to ensure smooth transition

        return () => clearTimeout(timer);
    }, []);

    return <>{children}</>;
};
