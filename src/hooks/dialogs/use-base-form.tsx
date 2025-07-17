import { ApiError } from '@/services/http-client-types';
import { skipToken, useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useFormWithApiErrors } from '../form/use-form-with-api-errors';
import { useToastHelpers } from '../use-toast-helpers';
import { UseBaseFormPropsType, UseBaseFormReturnType } from './types';

/**
 * Base form hook that encapsulates common form, mutation, and query logic.
 *
 * This hook provides a complete form management solution that handles:
 * - Form state and validation using react-hook-form
 * - Data fetching for edit scenarios using react-query
 * - Mutation handling with loading states and error management
 * - Automatic form population when editing existing entities
 * - Toast notifications for success/error states
 * - Cache invalidation after successful mutations
 *
 * @typeParam TDto - The entity DTO type (e.g., ProductDto)
 * @typeParam TMutationDto - The mutation input DTO type (e.g., CreateProductDto, UpdateProductDto)
 * @typeParam TMutationOutputDto - The mutation output DTO type (usually same as TDto)
 * @typeParam TFormDataType - The form data type (extends FieldValues)
 *
 * @param props - Configuration object for the form behavior
 * @returns Complete form state and handlers
 *
 * @example
 * ```typescript
 * // Basic usage for entity editing
 * const form = useBaseForm({
 *   defaultValues: { name: '', description: '' },
 *   getFunction: (id) => api.getProduct(id),
 *   formToDto: (data) => ({ ...data, isActive: true }),
 *   dtoToForm: (entity) => ({ name: entity.name, description: entity.description }),
 *   mutationFn: (data) => api.updateProduct(selectedId, data),
 *   queryKey: ['products'],
 *   onSuccessMessage: 'Product updated successfully',
 * });
 *```
 * @example
 * ```typescript
 * // Usage with custom query for composite keys
 * const form = useBaseForm({
 *   defaultValues: { price: 0 },
 *   formToDto: (data) => ({ price: data.price }),
 *   dtoToForm: (entity) => ({ price: entity.price }),
 *   mutationFn: (data) => api.updateProvinceProduct(provinceId, productId, data),
 *   queryKey: ['province-products'],
 *   onSuccessMessage: 'Province product updated successfully',
 *   customQuery: {
 *     queryKey: ['province-product', provinceId, productId],
 *     queryFn: () => api.getProvinceProduct(provinceId, productId),
 *     enabled: true,
 *   },
 * });
 * ```
 */
export const useBaseForm = <TDto, TMutationDto, TMutationOutputDto, TFormDataType extends FieldValues>(
    props: UseBaseFormPropsType<TDto, TMutationDto, TMutationOutputDto, TFormDataType>,
): UseBaseFormReturnType<TDto, TFormDataType> => {
    const {
        initialId,
        defaultValues,
        getFunction,
        mutationFn,
        formToDto,
        dtoToForm,
        onError,
        onSuccess,
        customQuery,
        queryKey,
        queryKeysToInvalidate,
        onSuccessMessage,
        enableQuery = true,
        resetOnSuccess = true,
        showToastOnSuccess = true,
        invalidateOnSuccess = true,
    } = props;

    const [selectedId, setSelectedId] = useState<string | null>(initialId ?? null);
    const { toastSuccess, toastError } = useToastHelpers();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const form = useForm<TFormDataType>({
        defaultValues,
    });

    const { reset } = form;

    /**
     * Query options configuration. Uses custom query if provided,
     * otherwise builds default options for standard entity fetching.
     *
     * Custom queries are useful for:
     * - Composite keys (e.g., provinceId + productId)
     * - Complex query logic
     * - Different data structures
     */
    const queryOptions: UseQueryOptions<TDto, ApiError> = useMemo(() => {
        return customQuery
            ? { ...customQuery } // Use custom query for special cases (e.g., composite keys)
            : {
                  // Build default query options for standard entity fetching
                  queryKey: [...queryKey, selectedId],
                  queryFn: getFunction && selectedId ? () => getFunction(selectedId) : skipToken,

                  enabled: enableQuery && !!getFunction && !!selectedId,
              };
    }, [customQuery, selectedId, queryKey, getFunction, enableQuery]);

    /**
     * Execute the query to fetch entity data.
     * This will either use the custom query or the default query based on configuration.
     */
    const queryResult = useQuery<TDto, ApiError>(queryOptions);
    const { data: currentEntity, isLoading: isLoadingData } = queryResult;

    // =========================================================================
    // FORM POPULATION
    // =========================================================================

    /**
     * Automatically populate form fields when entity data is loaded.
     * This effect runs whenever currentEntity changes and dtoToForm is provided.
     */
    useEffect(() => {
        if (currentEntity && dtoToForm) {
            reset({ ...dtoToForm(currentEntity) });
        }
    }, [currentEntity, dtoToForm, reset]);

    // =========================================================================
    // MUTATION HANDLING
    // =========================================================================

    /**
     * Mutation for creating/updating entities.
     * Handles success and error cases with automatic:
     * - Cache invalidation
     * - Toast notifications
     * - Form reset
     * - Custom success/error callbacks
     */
    const mutation = useMutation<TMutationOutputDto, ApiError, TMutationDto>({
        mutationFn,
        onSuccess: async (result) => {
            if (invalidateOnSuccess && queryKeysToInvalidate && queryKeysToInvalidate.length > 0) {
                await Promise.all(
                    queryKeysToInvalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey: queryKey as readonly unknown[] })),
                );
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
            /**
             * Handle API errors with smart error message display:
             * 1. For validation errors, check if they're form-specific
             * 2. If form-specific, let useFormWithApiErrors handle them
             * 3. If general errors, show toast with first error message
             * 4. For non-validation errors, show status + message
             */
            if (error.isValidationError()) {
                const formValues = Object.keys(form.getValues());
                const hasFormSpecificErrors = error.errors && Object.keys(error.errors).some((errorKey) => formValues.includes(errorKey));

                if (!hasFormSpecificErrors) {
                    // General validation errors not related to specific form fields
                    const generalErrors = Object.values(error.errors || {})[0];
                    const errorMessage = generalErrors[0];
                    toastError(errorMessage ?? t('common.error.generic'));
                }
                // Form-specific errors are handled by useFormWithApiErrors
            } else {
                // Non-validation errors (network, server, etc.)
                toastError(`${error.message}. ${error.detail ?? ''}`, `${t('common.error.title')} - ${error.status}`);
            }
            // Execute custom error callback if provided
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
        apiError: mutation.error, // Expose mutation error for access in components

        // Loading states
        isLoading: mutation.isPending, // Mutation in progress
        isLoadingData, // Query/data fetching in progress

        // Current entity data
        currentEntity,
        selectedId,

        // Entity management actions
        loadEntity,
        clearEntity,
    };
};
