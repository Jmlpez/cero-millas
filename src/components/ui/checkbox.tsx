import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import React from 'react';

import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
    ({ className, ...props }, ref) => {
        return (
            <CheckboxPrimitive.Root
                ref={ref}
                data-slot="checkbox"
                className={cn(
                    'peer bg-background border-input hover:border-input-hover data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:border-input-dark dark:hover:border-input-hover-dark dark:data-[state=checked]:bg-primary-dark dark:data-[state=checked]:text-primary-foreground-dark dark:data-[state=checked]:border-primary-dark size-5 shrink-0 rounded-[4px] border shadow-xs transition duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20',
                    className,
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    data-slot="checkbox-indicator"
                    className={cn(
                        'flex w-full items-center justify-center text-current transition',
                        'data-[state=checked]:animate-in data-[state=checked]:zoom-in data-[state=checked]:duration-200',
                        'data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out data-[state=unchecked]:duration-200',
                    )}
                >
                    <CheckIcon className="size-full" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
    },
);

export { Checkbox };
