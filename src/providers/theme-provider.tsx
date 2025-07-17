import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

/** Represents the available theme options for the application */
type Theme = 'light' | 'dark';

/** Defines the shape of the theme context value */
type ThemeContextType = {
    /** Current theme state */
    theme: Theme;
    /** Function to toggle between light and dark themes */
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider component that manages theme state and allows theme switching.
 * Initializes theme from localStorage and updates DOM classes accordingly.
 * @param props - Component props. Contains the children to render.
 */
export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // This code will only run on the client side
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme || 'light'; // Default to light theme

        setTheme(initialTheme);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme, isInitialized]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to access the theme context and its functions.
 * @returns The theme context containing current theme and toggle function
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
