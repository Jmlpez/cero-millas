import { UseConfirmationDialogReturnType } from '@hooks/dialogs/types';
import { ConfirmationDialog } from '@ui/confirmation-dialog';
import { useTranslation } from 'react-i18next';

type RestoreConfirmationDialogProps = UseConfirmationDialogReturnType;

export const RestoreConfirmationDialog = (props: RestoreConfirmationDialogProps) => {
    const { t } = useTranslation();

    return (
        <ConfirmationDialog
            {...props}
            variant="default"
            confirmationMessage={t('common.actions.delete.confirmationMessage')}
        />
    );
};
