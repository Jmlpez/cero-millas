import { ApiError } from '@/services/http-client-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useFormWithApiErrors } from '../form/use-form-with-api-errors';
import { useToastHelpers } from '../use-toast-helpers';
import { UseSimpleFormPropsType, UseSimpleFormReturnType } from './types';

/**
 * Simple form hook for forms that don't need to load existing entity data.
 *
 * This hook is ideal for:
 * - Create-only forms (no edit mode)
 * - Upload dialogs (file uploads, imports)
 * - Simple action forms (password reset, send email)
 * - Standalone forms that don't require data fetching
 *
 * Key differences from useBaseForm:
 * - No data fetching/query functionality
 * - No dtoToForm transformation (since no data to load)
 * - Simpler API surface
 * - Better performance for create-only scenarios
 *
 * @typeParam TMutationDto - The mutation input DTO type (e.g., CreateProductDto)
 * @typeParam TMutationOutputDto - The mutation output DTO type (usually the created entity)
 * @typeParam TFormDataType - The form data type (extends FieldValues)
 *
 * @param props - Configuration object for the form behavior
 * @returns Form state, handlers, and mutation status
 *
 * @example
 * ```typescript
 * // Create product form
 * const createForm = useSimpleForm({
 *   defaultValues: { name: '', description: '', price: 0 },
 *   formToDto: (data) => ({
 *     name: data.name,
 *     description: data.description,
 *     price: data.price,
 *     isActive: true
 *   }),
 *   mutationFn: (data) => api.createProduct(data),
 *   queryKey: ['products'],
 *   onSuccessMessage: 'Product created successfully',
 * });
 * ```
 * @example
 * ```typescript
 * // File upload form
 * const uploadForm = useSimpleForm({
 *   defaultValues: { files: [], description: '' },
 *   formToDto: (data) => {
 *     const formData = new FormData();
 *     data.files.forEach(file => formData.append('files', file));
 *     formData.append('description', data.description);
 *     return formData;
 *   },
 *   mutationFn: (formData) => api.uploadFiles(formData),
 *   queryKey: ['files'],
 *   onSuccessMessage: 'Files uploaded successfully',
 *   resetOnSuccess: true,
 * });
 * ```
 * @example
 * ```typescript
 * // Simple action form (password reset)
 * const resetForm = useSimpleForm({
 *   defaultValues: { email: '' },
 *   formToDto: (data) => ({ email: data.email }),
 *   mutationFn: (data) => api.requestPasswordReset(data),
 *   queryKey: ['auth'],
 *   onSuccessMessage: 'Password reset email sent',
 *   showToastOnSuccess: true,
 *   resetOnSuccess: true,
 * });
 * ```
 */

export const useSimpleForm = <TMutationDto, TMutationOutputDto, TFormDataType extends FieldValues>(
    props: UseSimpleFormPropsType<TMutationDto, TMutationOutputDto, TFormDataType>,
): UseSimpleFormReturnType<TFormDataType> => {
    const {
        defaultValues,
        mutationFn,
        formToDto,
        onError,
        onSuccess,
        queryKeys,
        onSuccessMessage,
        resetOnSuccess = true,
        showToastOnSuccess = true,
        invalidateOnSuccess = true,
    } = props;

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { toastSuccess, toastError } = useToastHelpers();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const form = useForm<TFormDataType>({
        defaultValues,
    });

    // =========================================================================
    // MUTATION HANDLING
    // =========================================================================

    /**
     * Mutation for creating entities or performing actions.
     * Handles success and error cases with automatic:
     * - Cache invalidation to refresh lists
     * - Toast notifications for user feedback
     * - Form reset for clean state
     * - Custom success/error callbacks
     */

    const mutation = useMutation<TMutationOutputDto, ApiError, TMutationDto>({
        mutationFn,
        onSuccess: async (result) => {
            if (invalidateOnSuccess && queryKeys && queryKeys.length > 0) {
                await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey: queryKey as readonly unknown[] })));
            }

            if (showToastOnSuccess) {
                toastSuccess(onSuccessMessage);
            }

            if (resetOnSuccess) {
                form.reset();
            }

            onSuccess?.(result);
        },
        onError: (error: ApiError) => {
            if (error.isValidationError()) {
                const formValues = Object.keys(form.getValues());
                const hasFormSpecificErrors = error.errors && Object.keys(error.errors).some((errorKey) => formValues.includes(errorKey));

                if (!hasFormSpecificErrors) {
                    const generalErrors = Object.values(error.errors || {})[0];
                    const errorMessage = generalErrors[0];
                    toastError(errorMessage ?? t('common.error.generic'));
                }
            } else {
                toastError(`${error.message}. ${error.detail ?? ''}`, `${t('common.error.title')} - ${error.status}`);
            }
            onError?.(error);
        },
    });

    const { hasFieldError, getFieldError } = useFormWithApiErrors<TFormDataType>(form, mutation.error);

    const loadEntity = useCallback((id: string) => {
        setSelectedId(id);
    }, []);

    const clearEntity = useCallback(() => {
        setSelectedId(null);
        form.reset();
    }, [form]);

    return {
        // Form state and methods from react-hook-form
        ...form,

        // Enhanced form methods
        hasFieldError,
        getFieldError,
        onSubmit: (data: TFormDataType) => mutation.mutate(formToDto(data)),

        // Loading state
        isLoading: mutation.isPending, // Mutation in progress

        // Data (for interface compatibility)
        selectedId,

        // Actions
        loadEntity,
        clearEntity,
    };
};
