import { ToastItem } from '@/providers/toast-provider';
import { Button } from '@headlessui/react';
import { AlertVariant } from '@ui/alert-dialog';
import { CircularProgress } from '@ui/circular-progress';
import { variantStyles } from '@ui/toast/toast-variants';
import { useProgressTimer } from '@ui/toast/use-progress-timer';
import { cn } from '@utils';
import { LucideX } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Initially the same variants are used
export type ToastVariant = AlertVariant;

interface ToastProps extends ToastItem {
    /**
     * Callback triggered when the toast is closed.
     */
    onClose: () => void;

    /**
     * Position of the toast in the stack.
     */
    stackPosition: number;
}

// TODO: DEPRECATED
export const Toast = (props: ToastProps) => {
    const { onClose, stackPosition, variant = 'info', description = 'No description provided', duration = 5, showProgress = true } = props;

    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const touchTimer = useRef<NodeJS.Timeout>();

    const currentVariant = variantStyles[variant];

    const handleComplete = useCallback(() => {
        setIsVisible(false);
        // Wait for the animation to finish before calling onClose
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const [progress] = useProgressTimer(duration, isPaused, handleComplete);

    const handleClose = useCallback(() => {
        handleComplete();
    }, [handleComplete]);

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
            handleClose();
        }
    }, [handleClose]);

    if (!isVisible) return null;

    const toastContent = (
        <div
            className={cn(
                'fixed right-4 z-[10000] flex w-md overflow-hidden',
                'rounded-lg border shadow-lg',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700',
                'transition-all duration-300 ease-in-out',
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
            )}
            style={{
                bottom: `${stackPosition * 90 + 20}px`,
                touchAction: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="alert"
            aria-live="polite"
            aria-label={typeof description === 'string' ? description : 'Toast notification'}
            data-toast="true"
        >
            {/* Left vertical colored bar */}
            <div
                className="w-1.5 flex-shrink-0"
                style={{ backgroundColor: currentVariant.mainColor }}
            />

            <div className="flex flex-1 items-start p-4">
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

                {/* Description */}
                <div className={cn('flex-1 text-sm font-medium', 'text-gray-700 dark:text-gray-200')}>{description}</div>

                {/* Close button */}
                <Button
                    className="-mt-1 -mr-1 ml-2 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    aria-label="Close toast"
                    onClick={handleClose}
                >
                    <LucideX className="size-4" />
                </Button>
            </div>
        </div>
    );

    // Render in portal to avoid z-index and modal interference issues
    return createPortal(toastContent, document.body);
};
