import { UseSimpleFormDialogReturnType } from '@hooks/dialogs/types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '@ui/button';
import { Dialog, DialogOverlay, DialogPortal } from '@ui/dialog';
import { InputError } from '@ui/input-error';
import { Label } from '@ui/label';
import { Textarea } from '@ui/text-area';
import { cn } from '@utils';
import { LucideInfo, LucideLoader2, LucideX } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type ConfirmationWithNoteDialogProps = UseSimpleFormDialogReturnType<{ note: string }> & {
    confirmationMessage?: string;
};

export const ConfirmationWithNoteDialog = (props: ConfirmationWithNoteDialogProps) => {
    const { open, handleClose, title, isLoading, onSubmit, selectedId, register, confirmationMessage, handleSubmit, getFieldError, hasFieldError } =
        props;

    const { t: tCommon } = useTranslation();

    const handleConfirmationAction = handleSubmit((data) => {
        if (selectedId) {
            onSubmit(data);
        }
    });

    const handleCloseDialog = useCallback(
        (isOpen: boolean) => {
            if (!isOpen && !isLoading) handleClose();
        },
        [handleClose, isLoading],
    );

    const handlePointerDownOutside = useCallback((event: CustomEvent<{ originalEvent: PointerEvent }>) => {
        const target = event.detail.originalEvent.target as Element;

        // Use closest to find an ancestor with data-toast="true"
        if (target.closest('[data-toast="true"]')) {
            event.preventDefault();
            return;
        }
    }, []);

    const handleInteractOutside = useCallback((event: CustomEvent<{ originalEvent: Event }>) => {
        const target = event.detail.originalEvent.target as Element;

        // Use closest to find an ancestor with data-toast="true"
        if (target.closest('[data-toast="true"]')) {
            event.preventDefault();
            return;
        }
    }, []);

    return (
        <Dialog
            open={open}
            onOpenChange={handleCloseDialog}
        >
            <DialogPortal data-slot="dialog-portal">
                <DialogOverlay />
                <DialogPrimitive.Content
                    className={cn(
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200 sm:max-w-md lg:max-w-xl dark:bg-gray-800',
                    )}
                    onPointerDownOutside={handlePointerDownOutside}
                    onInteractOutside={handleInteractOutside}
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Centered animated icon */}
                        <div>
                            <LucideInfo
                                size={64}
                                style={{ color: '#EF4444' }}
                            />
                        </div>
                        {/* Title */}
                        <DialogPrimitive.Title
                            className="mt-4 text-2xl font-bold"
                            style={{ color: '#EF4444' }}
                        >
                            {title}
                        </DialogPrimitive.Title>
                        {/* Description */}
                        {confirmationMessage && (
                            <DialogPrimitive.Description className="mt-2 text-gray-700 dark:text-gray-300">
                                {confirmationMessage}
                            </DialogPrimitive.Description>
                        )}

                        <form
                            onSubmit={handleConfirmationAction}
                            className={'mt-4 flex w-full flex-col gap-4'}
                        >
                            {/* Note field */}
                            <div className={'flex w-full flex-col'}>
                                <Label
                                    className={'text-left'}
                                    htmlFor="note"
                                >
                                    {tCommon('common.actions.confirmationWithNote.noteLabel')}
                                </Label>
                                <Textarea
                                    id="note"
                                    placeholder={tCommon('common.actions.confirmationWithNote.notePlaceholder')}
                                    rows={4}
                                    error={hasFieldError('note')}
                                    {...register('note')}
                                />
                                <InputError message={getFieldError('note')} />
                            </div>

                            <div className="mt-6 flex justify-center space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    type="button"
                                >
                                    {tCommon('common.cancel')}
                                </Button>
                                <Button
                                    variant="destructive"
                                    disabled={isLoading || !selectedId}
                                    type="submit"
                                >
                                    {isLoading ? <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {tCommon('common.confirm')}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant={'outline'}
                            className={'absolute top-3 right-3'}
                            onClick={() => handleCloseDialog(false)}
                        >
                            <LucideX className="text-gray-500 hover:text-gray-700" />
                        </Button>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};
