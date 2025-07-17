import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { UseFormDialogPropsType, UseFormDialogReturnType } from './types';
import { useBaseForm } from './use-base-form';

export const useFormDialog = <TDto, TMutationDto, TMutationOutputDto, TFormType extends FieldValues>(
    props: UseFormDialogPropsType<TDto, TMutationDto, TMutationOutputDto, TFormType>,
): UseFormDialogReturnType<TDto, TFormType> => {
    const { title } = props;

    const [isOpen, setIsOpen] = useState(false);

    const baseForm = useBaseForm<TDto, TMutationDto, TMutationOutputDto, TFormType>({
        ...props,
        enableQuery: isOpen, // Only load data when dialog is open
        resetOnSuccess: true,
        showToastOnSuccess: true,
        invalidateOnSuccess: true,
        onSuccess: (data) => {
            props.onSuccess?.(data);
            handleClose();
        },
    });

    const handleOpen = useCallback(
        (id?: string) => {
            if (id) baseForm.loadEntity(id);
            setIsOpen(true);
        },
        [baseForm],
    );

    const handleClose = useCallback(() => {
        setIsOpen(false);
        baseForm.clearEntity();
    }, [baseForm]);

    return {
        // Dialog
        open: isOpen,
        title,
        handleOpen,
        handleClose,

        ...baseForm,
    };
};
