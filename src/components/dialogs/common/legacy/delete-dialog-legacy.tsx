import { ConfirmationDialogLegacy } from '@/components/ui/confirmation-dialog-legacy';

export interface DeleteDialogProps {
    isOpen: boolean;
    isLoading: boolean;
    title: string;
    description: string;
    close: () => void;
    execute: () => void;
}

export const DeleteDialogLegacy = (props: DeleteDialogProps) => {
    const { isOpen, isLoading, title, description, close, execute } = props;

    return (
        <ConfirmationDialogLegacy
            open={isOpen}
            onOpenChange={(open) => {
                if (!open && !isLoading) {
                    close();
                }
            }}
            title={title}
            confirmationMessage={description}
            isConfirmationLoading={isLoading}
            variant="destructive"
            handleConfirmationAction={execute}
        />
    );
};
