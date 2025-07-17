import { DeleteDialogLegacy, DeleteDialogProps } from '@/components/dialogs/common/legacy/delete-dialog-legacy';
import { RestoreDialogLegacy, RestoreDialogProps } from '@/components/dialogs/common/legacy/restore-dialog-legacy';

export interface BaseActionsDialogsLegacyProps {
    delete: DeleteDialogProps;
    restore: RestoreDialogProps;
}

export const BaseActionsDialogsLegacy = (props: BaseActionsDialogsLegacyProps) => {
    return (
        <>
            <DeleteDialogLegacy {...props.delete} />
            <RestoreDialogLegacy {...props.restore} />
        </>
    );
};
