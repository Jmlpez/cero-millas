import { ApiError } from '@/services/http-client-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToastHelpers } from '../use-toast-helpers';
import { UseConfirmationFormPropsType, UseConfirmationFormReturnType } from './types';

export const useConfirmationForm = <TMutationOutputDto,>(props: UseConfirmationFormPropsType<TMutationOutputDto>): UseConfirmationFormReturnType => {
    const { mutationFn, onError, onSuccess, onSettled, queryKeys, onSuccessMessage, showToastOnSuccess = true, invalidateOnSuccess = true } = props;

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { toastSuccess, toastError } = useToastHelpers();
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const mutation = useMutation<TMutationOutputDto, ApiError, string>({
        mutationFn,
        onSuccess: async (result) => {
            if (invalidateOnSuccess && queryKeys && queryKeys.length > 0) {
                await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey: queryKey as readonly unknown[] })));
            }

            if (showToastOnSuccess) {
                toastSuccess(onSuccessMessage);
            }

            onSuccess?.(result);
        },
        onError: (error: ApiError) => {
            toastError(`${error.message}. ${error.detail ?? ''}`, `${t('common.error.title')} - ${error.status}`);
            onError?.(error);
        },
        onSettled: () => {
            // Execute any custom additional cleanup or final actions
            onSettled?.();
        },
    });

    const loadEntity = useCallback((id: string) => {
        setSelectedId(id);
    }, []);

    const clearEntity = useCallback(() => {
        setSelectedId(null);
    }, []);

    return {
        // Form
        onSubmit: (id: string) => mutation.mutate(id),

        // Status
        isLoading: mutation.isPending,

        // Data
        selectedId,

        // Actions
        loadEntity,
        clearEntity,
    };
};
