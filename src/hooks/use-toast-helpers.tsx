// import { useToast } from '@/providers/toast-provider';
import { useEnhancedToast } from '@/providers/enhanced-toast-provider';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useToastHelpers = () => {
    const { addToast } = useEnhancedToast();
    const { t } = useTranslation('common');

    const toastSuccess = useCallback(
        (message: string, title?: string, duration = 5) => {
            addToast({
                variant: 'success',
                title: title || t('common.success.title'),
                description: message,
                duration,
                showProgress: true,
            });
        },
        [addToast, t],
    );

    const toastError = useCallback(
        (message?: string, title?: string, duration = 5) => {
            addToast({
                variant: 'error',
                title: title || t('common.error.title'),
                description: message || t('common.error.generic'),
                duration,
                showProgress: true,
            });
        },
        [addToast, t],
    );

    const toastInfo = useCallback(
        (message: string, title?: string, duration = 5) => {
            addToast({
                variant: 'info',
                title: title || t('common.info.title'),
                description: message,
                duration,
                showProgress: true,
            });
        },
        [addToast, t],
    );

    const toastWarning = useCallback(
        (message: string, title?: string, duration = 5) => {
            addToast({
                variant: 'warning',
                title: title || t('common.warning.title'),
                description: message,
                duration,
                showProgress: true,
            });
        },
        [addToast, t],
    );

    // Generic API error handler
    const toastApiError = useCallback(
        (error?: string, title?: string) => {
            const message = error || t('common.error.generic');
            toastError(message, title || t('common.error.api.title'));
        },
        [t, toastError],
    );

    return {
        toastSuccess,
        toastError,
        toastInfo,
        toastWarning,
        toastApiError,
    };
};
