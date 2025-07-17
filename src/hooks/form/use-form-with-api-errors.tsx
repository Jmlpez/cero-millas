// hooks/use-form-with-api-errors.ts
import { ApiError } from '@services/http-client-types';
import { useCallback, useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export const useFormWithApiErrors = <TFormDataType extends FieldValues>(form: UseFormReturn<TFormDataType>, apiError: ApiError | null) => {
    const { setError } = form;

    useEffect(() => {
        const errors = apiError?.getErrors();
        if (errors) {
            Object.entries(errors).forEach(([field, messages]) => {
                if (field in form.getValues()) {
                    setError(field as Path<TFormDataType>, {
                        type: 'server',
                        message: messages[0],
                    });
                }
            });
        }
    }, [apiError, form, setError]);

    const getFieldError = useCallback(
        (fieldName: keyof TFormDataType): string | undefined => {
            const formError = form.formState.errors[fieldName]?.message as string;
            if (formError) return formError;
        },
        [form.formState.errors],
    );

    const hasFieldError = useCallback(
        (fieldName: keyof TFormDataType): boolean => {
            return !!form.formState.errors[fieldName];
        },
        [form.formState.errors],
    );

    return { getFieldError, hasFieldError };
};
