import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex transition-all cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-foreground-dark dark:hover:bg-primary-dark/90',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive-dark dark:hover:bg-destructive-dark/90',
                outline:
                    'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-gray-800 dark:bg-background-dark dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 dark:bg-secondary-dark dark:text-secondary-foreground-dark dark:hover:bg-secondary-dark/80',
                ternary:
                    'bg-ternary text-ternary-foreground shadow-xs hover:bg-ternary/80 dark:bg-ternary-dark dark:text-ternary-foreground-dark dark:hover:bg-ternary-dark/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark',
                link: 'text-primary underline-offset-4 hover:underline dark:text-primary-dark',
                success:
                    'bg-green-600 text-white shadow-xs hover:bg-green-700 focus-visible:ring-green-600/20 dark:bg-green-700 dark:hover:bg-green-800 dark:focus-visible:ring-green-600/40',
                warning:
                    'bg-yellow-600 text-white shadow-xs hover:bg-yellow-700 focus-visible:ring-yellow-600/20 dark:bg-yellow-700 dark:hover:bg-yellow-800 dark:focus-visible:ring-yellow-600/40',
                info: 'bg-blue-600 text-white shadow-xs hover:bg-blue-700 focus-visible:ring-blue-600/20 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus-visible:ring-blue-600/40',
                muted: 'bg-gray-600 text-white shadow-xs hover:bg-gray-700 focus-visible:ring-gray-600/20 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-600/40',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<'button'> &
        VariantProps<typeof buttonVariants> & {
            asChild?: boolean;
        }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
