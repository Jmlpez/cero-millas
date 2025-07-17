// import { ApiError } from '@/services/http-client-types';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useCallback, useEffect, useState } from 'react';
// import { FieldValues, useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { useFormWithApiErrors } from '../use-form-with-api-errors';
// import { useToastHelpers } from '../use-toast-helpers';
// import { UseFormDialogPropsType, UseFormDialogReturnType } from './types';

// export const useFormDialogOld = <TDto, TMutationDto, TMutationOutputDto, TFormType extends FieldValues>(
//     props: UseFormDialogPropsType<TDto, TMutationDto, TMutationOutputDto, TFormType>,
// ): UseFormDialogReturnType<TFormType> => {
//     const { initialId, defaultValues, getFunction, mutationFn, formToDto, dtoToForm, onError, onSuccess, queryKey, onSuccessMessage, title } = props;

//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedId, setSelectedId] = useState<string | null>(initialId ?? null);

//     const { toastSuccess, toastError } = useToastHelpers();
//     const { t } = useTranslation();
//     const queryClient = useQueryClient();

//     const form = useForm<TFormType>({
//         defaultValues,
//     });
//     const { control, handleSubmit, reset, register, setError, getValues, setValue } = form;

//     // get the current entity by its id
//     const { data: currentEntity, isLoading: currentEntityIsLoading } = useQuery({
//         queryFn: () => getFunction?.(selectedId!),
//         queryKey: [...queryKey, selectedId!],
//         enabled: !!getFunction && !!queryKey && !!selectedId,
//     });

//     // Fill all the form fields
//     useEffect(() => {
//         // console.log({ dtoToForm });
//         if (currentEntity && dtoToForm) reset({ ...dtoToForm(currentEntity) });
//     }, [currentEntity, dtoToForm, reset]);

//     const dialogMutation = useMutation<TMutationOutputDto, ApiError, TMutationDto>({
//         mutationFn,
//         onSuccess: async (result) => {
//             await queryClient.invalidateQueries({ queryKey });
//             onSuccess?.(result);
//             toastSuccess(onSuccessMessage);
//             handleClose();
//         },
//         onError: (error: ApiError) => {
//             if (error.isValidationError()) {
//                 const formValues = Object.keys(form.getValues());
//                 const hasFormSpecificErrors = error.errors && Object.keys(error.errors).some((errorKey) => formValues.includes(errorKey));

//                 // If validation error but no form-specific fields, show toast
//                 if (!hasFormSpecificErrors) {
//                     // Get the first error from the error.errors object.
//                     // Example: ({priceInvalid: ["Price is invalid"], "preOrder": ["PreOrder Error"]})
//                     // generalErrors will be ["Price is required"]
//                     const generalErrors = Object.values(error.errors || {})[0];
//                     const errorMessage = generalErrors[0];
//                     toastError(errorMessage ?? t('common.error.generic'));
//                 }
//             } else {
//                 toastError(`${error.status} - ${error.message}`);
//             }
//             onError?.(error);
//         },
//     });

//     const { hasFieldError, getFieldError } = useFormWithApiErrors<TFormType>(form, dialogMutation.error);

//     const handleOpen = useCallback((id?: string) => {
//         if (id) setSelectedId(id);
//         setIsOpen(true);
//     }, []);

//     const handleClose = useCallback(() => {
//         setIsOpen(false);
//         setSelectedId(null);
//         form.reset();
//     }, [form]);

//     return {
//         // Dialog state
//         open: isOpen,
//         title,
//         selectedId,

//         // Actions
//         handleOpen,
//         handleClose,

//         // Form
//         control,
//         register,
//         getValues,
//         setValue,
//         hasFieldError,
//         getFieldError,
//         handleSubmit,
//         onSubmit: (data: TFormType) => dialogMutation.mutate(formToDto(data)),
//         reset,
//         setError,

//         // Status
//         isLoading: currentEntityIsLoading || dialogMutation.isPending,
//     };
// };
