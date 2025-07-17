import { UseConfirmationDialogReturnType } from '@hooks/dialogs/types';
import { ConfirmationDialog } from '@ui/confirmation-dialog';
import { useTranslation } from 'react-i18next';

type DeleteConfirmationDialogProps = UseConfirmationDialogReturnType;

export const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {
    const { t } = useTranslation();

    return (
        <ConfirmationDialog
            {...props}
            variant="destructive"
            confirmationMessage={t('common.actions.delete.confirmationMessage')}
        />
    );
};
