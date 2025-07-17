import { useTheme } from '@/providers/theme-provider';
import { Button } from '@ui/button';
import { cn } from '@utils';
import { LucideMoon, LucideSun } from 'lucide-react';

type ThemeToggleButtonProps = {
    className?: string;
};

export const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
    const { theme, toggleTheme } = useTheme();

    const { className } = props;

    return (
        <Button
            variant={'ghost'}
            className={cn(
                'hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                className,
            )}
            onClick={toggleTheme}
        >
            {theme === 'light' ? <LucideMoon /> : <LucideSun />}
        </Button>
    );
};
