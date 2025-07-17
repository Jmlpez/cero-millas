import { ApiError } from '@/services/http-client-types';
import { MutationFunction, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import React from 'react';
import { DefaultValues, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

// =============================================================================
// CONFIRMATION FORM TYPES
// =============================================================================
// Used for simple confirmation dialogs that only need an ID to perform an action

export interface UseConfirmationFormPropsType<TMutationOutputDto> {
    mutationFn: MutationFunction<TMutationOutputDto, string>;
    onError?: (errors: ApiError) => void;
    onSuccess?: (data: TMutationOutputDto) => void;
    onSettled?: () => void;
    queryKeys?: QueryKey;
    onSuccessMessage: string;
    onErrorMessage?: string;
    showToastOnSuccess?: boolean;
    invalidateOnSuccess?: boolean;
}

export interface UseConfirmationFormReturnType {
    onSubmit: (id: string) => void;

    // Status
    isLoading?: boolean;
    selectedId?: string | null;

    // Actions
    loadEntity: (id: string) => void;
    clearEntity: () => void;
}

export interface UseConfirmationDialogPropsType<TMutationOutputDto> extends UseConfirmationFormPropsType<TMutationOutputDto> {
    title: string;
}

export type UseConfirmationDialogReturnType = DialogPropsType &
    UseConfirmationFormReturnType & {
        handleOpen: (id?: string) => void;
    };

// =============================================================================
// SIMPLE FORM TYPES
// =============================================================================
// Used for forms that don't need to load existing entity data (e.g., create forms, upload dialogs)

export interface UseSimpleFormPropsType<TMutationDto, TMutationOutputDto, TFormType extends FieldValues> {
    defaultValues?: DefaultValues<TFormType>;
    formToDto: (data: TFormType) => TMutationDto;
    mutationFn: MutationFunction<TMutationOutputDto, TMutationDto>;
    onError?: (errors: ApiError) => void;
    onSuccess?: (data: TMutationOutputDto) => void;
    queryKeys: QueryKey[];
    onSuccessMessage: string;
    onErrorMessage?: string;
    resetOnSuccess?: boolean;
    showToastOnSuccess?: boolean;
    invalidateOnSuccess?: boolean;
}

export interface UseSimpleFormDialogPropsType<TMutationDto, TMutationOutputDto, TFormType extends FieldValues>
    extends UseSimpleFormPropsType<TMutationDto, TMutationOutputDto, TFormType> {
    title: string;
}

export interface UseSimpleFormReturnType<TFormType extends FieldValues> extends UseFormReturn<TFormType> {
    onSubmit: SubmitHandler<TFormType>;

    // Error handling
    getFieldError: (fieldName: keyof TFormType) => string | undefined;
    hasFieldError: (fieldName: keyof TFormType) => boolean;

    // Status
    isLoading?: boolean;
    selectedId?: string | null;

    // Actions
    loadEntity: (id: string) => void;
    clearEntity: () => void;
}

export type UseSimpleFormDialogReturnType<TFormType extends FieldValues> = DialogPropsType &
    UseSimpleFormReturnType<TFormType> & {
        handleOpen: (id?: string) => void;
    };

// =============================================================================
// BASE FORM TYPES
// =============================================================================
// Used for forms that can load existing entity data and perform CRUD operations

export interface UseBaseFormPropsType<TDto, TMutationDto, TMutationOutputDto, TFormType extends FieldValues> {
    initialId?: string | null;
    defaultValues?: DefaultValues<TFormType>;
    getFunction?: (id: string) => Promise<TDto>;
    formToDto: (data: TFormType) => TMutationDto;
    dtoToForm?: (data: TDto) => TFormType;
    mutationFn: MutationFunction<TMutationOutputDto, TMutationDto>;
    onError?: (errors: ApiError) => void;
    onSuccess?: (data: TMutationOutputDto) => void;

    // Unique key for the query
    // This is used for the getFunction query
    queryKey: QueryKey;

    // Additional query keys to invalidate after mutation success
    // This allows for more complex scenarios where multiple queries need to be refreshed
    // For example, if you have a list query and a detail query that need to be invalidated
    // after a mutation, you can pass both keys here
    queryKeysToInvalidate?: QueryKey[];
    // Optional query to use instead of the basic useQuery + getFunction combination
    // If provided, getFunction will be ignored
    // This is useful for more complex queries that require additional parameters
    customQuery?: UseQueryOptions<TDto, ApiError>;

    onSuccessMessage: string;
    onErrorMessage?: string;
    enableQuery?: boolean; // control if execute the query
    resetOnSuccess?: boolean;
    showToastOnSuccess?: boolean;
    invalidateOnSuccess?: boolean;
}

export interface UseBaseFormReturnType<TDto, TFormType extends FieldValues> extends UseFormReturn<TFormType> {
    onSubmit: SubmitHandler<TFormType>;

    // Error handling
    getFieldError: (fieldName: keyof TFormType) => string | undefined;
    hasFieldError: (fieldName: keyof TFormType) => boolean;
    apiError?: ApiError | null; // mutation Error

    // Status
    isLoading?: boolean;
    isLoadingData?: boolean; // Separate loading the data vs. performing mutation

    // Data
    currentEntity?: TDto;
    selectedId?: string | null;

    // Actions
    loadEntity: (id: string) => void;
    clearEntity: () => void;
}

// =============================================================================
// FORM DIALOG TYPES
// =============================================================================
// Used for modal/dialog-based forms that can load and edit existing entities

export interface UseFormDialogPropsType<TDto, TMutationDto, TMutationOutputDto, TFormType extends FieldValues>
    extends UseBaseFormPropsType<TDto, TMutationDto, TMutationOutputDto, TFormType> {
    title: string;
}

export type UseFormDialogReturnType<TDto, TFormType extends FieldValues> = DialogPropsType &
    UseBaseFormReturnType<TDto, TFormType> & {
        handleOpen: (id?: string) => void;
    };

// =============================================================================
// FORM PAGE TYPES
// =============================================================================
// Used for dedicated page-based forms (create/edit pages)

export type UseFormPageReturnType<TDto, TFormType extends FieldValues> = UseBaseFormReturnType<TDto, TFormType>;

// =============================================================================
// DIALOG UI TYPES
// =============================================================================
// Common dialog component props

export type DialogPropsType = {
    open?: boolean;
    title: string;
    children?: React.ReactNode;
    selectedId?: string | null;
    handleClose: () => void;
    containerClassName?: string;
    className?: string;
};

export interface ConfirmationDialogPropsType extends DialogPropsType {
    handleSubmit: () => void;
    isLoading?: boolean;
}
