import { useConfirmationForm } from '@hooks/dialogs/use-confirmation-form';
import { useCallback, useState } from 'react';
import { UseConfirmationDialogPropsType, UseConfirmationDialogReturnType } from './types';

export const useConfirmationDialog = <TMutationOutputDto,>(
    props: UseConfirmationDialogPropsType<TMutationOutputDto>,
): UseConfirmationDialogReturnType => {
    const { title } = props;
    const [isOpen, setIsOpen] = useState(false);

    const confirmationForm = useConfirmationForm<TMutationOutputDto>({
        ...props,
        onSuccess: (data) => {
            props.onSuccess?.(data);
            handleClose();
        },
    });

    const handleOpen = useCallback(
        (id?: string) => {
            if (id) confirmationForm.loadEntity(id);
            setIsOpen(true);
        },
        [confirmationForm],
    );

    const handleClose = useCallback(() => {
        setIsOpen(false);
        confirmationForm.clearEntity();
    }, [confirmationForm]);

    return {
        // Dialog state
        open: isOpen,
        title,
        handleClose,
        handleOpen,

        // Form
        ...confirmationForm,
    };
};
