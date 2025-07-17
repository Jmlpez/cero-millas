import { useFormWithApiErrors } from '@hooks/form/use-form-with-api-errors';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '@ui/button';
import { Dialog, DialogOverlay, DialogPortal } from '@ui/dialog';
import { InputError } from '@ui/input-error';
import { Label } from '@ui/label';
import { Textarea } from '@ui/text-area';
import { cn } from '@utils';
import { Info, LucideLoader2, LucideX } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ConfirmationWithNoteDialogData = {
    description: string;
};

interface ConfirmationWithNoteDialogLegacyProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    confirmationMessage?: string | React.ReactNode;
    isConfirmationLoading: boolean;
    handleConfirmationWithNoteAction: (note: string) => void;
}

export const ConfirmationWithNoteDialogLegacy = (props: ConfirmationWithNoteDialogLegacyProps) => {
    const { open, onOpenChange, title, confirmationMessage, isConfirmationLoading, handleConfirmationWithNoteAction } = props;
    const { t } = useTranslation();

    const form = useForm<ConfirmationWithNoteDialogData>({
        defaultValues: {
            description: '',
        },
    });
    const { register, handleSubmit } = form;
    const { hasFieldError, getFieldError } = useFormWithApiErrors<ConfirmationWithNoteDialogData>(form, null);

    const onSubmit: SubmitHandler<ConfirmationWithNoteDialogData> = (data) => {
        handleConfirmationWithNoteAction(data.description);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogPortal data-slot="dialog-portal">
                <DialogOverlay />
                <DialogPrimitive.Content
                    className={cn(
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200 sm:max-w-md lg:max-w-xl dark:bg-gray-800',
                    )}
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Centered animated icon */}
                        <div>
                            <Info
                                size={64}
                                style={{ color: '#3B82F6' }}
                            />
                        </div>
                        {/* Title */}
                        <DialogPrimitive.Title
                            className="mt-4 text-2xl font-bold"
                            style={{ color: '#3B82F6' }}
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
                            onSubmit={handleSubmit(onSubmit)}
                            className={'flex w-full flex-col gap-4'}
                        >
                            {/* Description */}
                            <div className={'flex w-full flex-col'}>
                                <Label
                                    className={'text-left'}
                                    htmlFor="description"
                                >
                                    {t('common.actions.confirmationWithNote.noteLabel')}
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder={t('common.actions.confirmationWithNote.notePlaceholder')}
                                    rows={8}
                                    error={hasFieldError('description')}
                                    {...register('description')}
                                />
                                <InputError message={getFieldError('description')} />
                            </div>

                            <div className="mt-6 flex justify-center space-x-3">
                                <DialogPrimitive.Close asChild>
                                    <Button
                                        variant="outline"
                                        disabled={isConfirmationLoading}
                                        type={'button'}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                </DialogPrimitive.Close>
                                <Button
                                    disabled={isConfirmationLoading}
                                    type={'submit'}
                                >
                                    {isConfirmationLoading ? <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {t('common.confirm')}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant={'outline'}
                            className={'absolute top-3 right-3'}
                        >
                            <LucideX className="text-gray-500 hover:text-gray-700" />
                        </Button>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};
