import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { UseSimpleFormDialogPropsType, UseSimpleFormDialogReturnType } from './types';
import { useSimpleForm } from './use-simple-form';

export const useSimpleFormDialog = <TMutationDto, TMutationOutputDto, TFormType extends FieldValues>(
    props: UseSimpleFormDialogPropsType<TMutationDto, TMutationOutputDto, TFormType>,
): UseSimpleFormDialogReturnType<TFormType> => {
    const { title } = props;
    const [isOpen, setIsOpen] = useState(false);

    const simpleForm = useSimpleForm<TMutationDto, TMutationOutputDto, TFormType>({
        ...props,
        onSuccess: (data) => {
            props.onSuccess?.(data);
            handleClose();
        },
    });

    const handleOpen = useCallback(
        (id?: string) => {
            if (id) simpleForm.loadEntity(id);
            setIsOpen(true);
        },
        [simpleForm],
    );

    const handleClose = useCallback(() => {
        setIsOpen(false);
        simpleForm.clearEntity();
    }, [simpleForm]);

    return {
        // Dialog state
        open: isOpen,
        title,
        handleClose,
        handleOpen,

        // Form
        ...simpleForm,
    };
};
