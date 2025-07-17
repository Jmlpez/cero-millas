import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export const InputError = ({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & {
    message?: string;
}) => {
    if (!message || message.trim() === '') {
        return null;
    }

    return (
        <p
            {...props}
            className={cn('dark:text-error-400 text-error-500 text-xs', className)}
        >
            {message}
        </p>
    );
};
