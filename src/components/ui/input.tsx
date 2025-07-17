import * as React from 'react';

import { cn } from '@/lib/utils';

// Used in Debounce Input
export interface InputProps extends React.ComponentProps<'input'> {
    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, disabled, error = false, ...props }, ref) => {
    let inputClasses = '';
    if (disabled) {
        inputClasses +=
            'text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40';
    } else if (error) {
        inputClasses +=
            'border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800';
    }

    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'border-input file:text-foreground selection:bg-primary flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 border-gray-300 bg-transparent text-gray-800 dark:border-gray-700 dark:text-white/90',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
                inputClasses,
                className,
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    );
});

export { Input };
