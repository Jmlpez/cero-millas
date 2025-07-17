import { FieldValues } from 'react-hook-form';
import { UseBaseFormPropsType, UseFormPageReturnType } from '../dialogs/types';
import { useBaseForm } from './use-base-form';

export const useFormPage = <TDto, TMutationDto, TMutationOutputDto, TFormDataType extends FieldValues>(
    props: UseBaseFormPropsType<TDto, TMutationDto, TMutationOutputDto, TFormDataType>,
): UseFormPageReturnType<TDto, TFormDataType> => {
    return useBaseForm<TDto, TMutationDto, TMutationOutputDto, TFormDataType>({
        ...props,
        enableQuery: true, // always true for pages
        resetOnSuccess: false, // Avoid reset the form on pages (the user navigates automatically)
        showToastOnSuccess: true,
        invalidateOnSuccess: true,
    });
};
