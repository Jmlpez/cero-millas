import { EnhancedToastItem } from '@/providers/enhanced-toast-provider';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { AlertVariant } from '@ui/alert-dialog';
import { CircularProgress } from '@ui/circular-progress';
import { variantStyles } from '@ui/toast/toast-variants';
import { useProgressTimer } from '@ui/toast/use-progress-timer';
import { cn } from '@utils';
import { LucideX } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

// Initially the same variants are used
export type ToastVariant = AlertVariant;

interface RadixToastProps extends EnhancedToastItem {
    /**
     * Callback triggered when the toast is closed.
     */
    onClose: () => void;

    /**
     * Position of the toast in the stack.
     */
    stackPosition: number;
}

export const RadixToast = (props: RadixToastProps) => {
    const { onClose, stackPosition, variant = 'info', title, description = 'No description provided', duration = 5, showProgress = true } = props;

    const [isPaused, setIsPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const touchTimer = useRef<NodeJS.Timeout>();

    const currentVariant = variantStyles[variant];

    const handleComplete = useCallback(() => {
        setIsOpen(false);
        onClose();
    }, [onClose]);

    // Convert duration from seconds to milliseconds
    const durationMs = duration * 1000;
    const [progress] = useProgressTimer(duration, isPaused, handleComplete);

    // Touch interactions
    const handleTouchStart = useCallback(() => {
        touchTimer.current = setTimeout(() => {
            setIsPaused(true);
        }, 300);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            setIsPaused(false);
        } else {
            handleComplete();
        }
    }, [handleComplete]);

    return (
        <ToastPrimitive.Root
            open={isOpen}
            onOpenChange={setIsOpen}
            duration={isPaused ? Infinity : durationMs}
            data-toast="true"
            className={cn(
                'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
                'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
                'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[swipe=end]:animate-out data-[state=closed]:fade-out-80',
                'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700',
            )}
            style={
                {
                    '--toast-bottom': `${stackPosition * 90 + 20}px`,
                } as React.CSSProperties
            }
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Left vertical colored bar */}
            <div
                className="absolute top-0 left-0 h-full w-1.5"
                style={{ backgroundColor: currentVariant.mainColor }}
            />

            <div className="flex flex-1 items-start pl-2">
                {/* Icon with circular progress */}
                {showProgress && (
                    <div className="mr-3 flex-shrink-0">
                        <CircularProgress
                            progress={progress}
                            size={44}
                            strokeWidth={3}
                            strokeColor={currentVariant.mainColor}
                        >
                            <div className="flex h-full items-center justify-center">{currentVariant.icon}</div>
                        </CircularProgress>
                    </div>
                )}
                <div className="flex-1 space-y-1">
                    {title && (
                        <ToastPrimitive.Title
                            className={cn('text-base leading-none font-semibold tracking-tight', 'text-gray-900 dark:text-gray-100')}
                            style={{ color: currentVariant.mainColor }}
                        >
                            {title}
                        </ToastPrimitive.Title>
                    )}

                    <ToastPrimitive.Description
                        className={cn(
                            'text-sm leading-relaxed',
                            title ? 'text-gray-600 dark:text-gray-300' : 'font-medium text-gray-700 dark:text-gray-200',
                        )}
                    >
                        {description}
                    </ToastPrimitive.Description>
                </div>
            </div>

            {/* Close button */}
            <ToastPrimitive.Close asChild>
                <button
                    className="absolute top-2 right-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gray-900 focus:opacity-100 focus:ring-2 focus:outline-none dark:text-gray-400 dark:hover:text-gray-50"
                    aria-label="Close toast"
                >
                    <LucideX className="size-4" />
                </button>
            </ToastPrimitive.Close>
        </ToastPrimitive.Root>
    );
};

// Toast Provider Component
interface RadixToastProviderProps {
    children: React.ReactNode;
}

export const RadixToastProvider = ({ children }: RadixToastProviderProps) => {
    return (
        <ToastPrimitive.Provider swipeDirection="right">
            {children}
            <ToastPrimitive.Viewport className="fixed right-0 bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-4 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]" />
        </ToastPrimitive.Provider>
    );
};
