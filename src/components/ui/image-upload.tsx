import { useToastHelpers } from '@hooks/use-toast-helpers';
import { Button } from '@ui/button';
import { InputError } from '@ui/input-error';
import { Label } from '@ui/label';
import { LucideImagePlus, LucideX } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ImageUploadProps {
    images: File[];
    onImagesChange: (images: File[]) => void;
    error?: string;
    maxImages?: number;
    maxSizeMB?: number;
    isLoading?: boolean;
}

export const ImageUpload = (props: ImageUploadProps) => {
    const { images, onImagesChange, error, maxImages = 5, maxSizeMB = 5, isLoading } = props;

    const { t } = useTranslation();
    const { toastError } = useToastHelpers();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const validateFile = useCallback(
        (file: File): string | null => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                return t('common.files.error.invalidType');
            }

            const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
            if (file.size > maxSize) {
                return t('common.files.error.tooLarge', { size: maxSizeMB });
            }

            return null;
        },
        [maxSizeMB, t],
    );

    const handleFileSelect = useCallback(
        (files: FileList | null) => {
            if (!files) return;

            const newFiles: File[] = [];
            const errors: string[] = [];

            Array.from(files).forEach((file) => {
                const validationError = validateFile(file);
                if (validationError) {
                    errors.push(`${file.name}: ${validationError}`);
                } else {
                    newFiles.push(file);
                }
            });

            if (errors.length > 0) {
                // Show validation errors
                toastError(errors.join('\n'));
            }

            const totalImages = images.length + newFiles.length;
            if (totalImages > maxImages) {
                const allowedCount = maxImages - images.length;
                newFiles.splice(allowedCount);
            }

            onImagesChange([...images, ...newFiles]);
        },
        [images, maxImages, onImagesChange, validateFile, toastError],
    );

    const removeImage = useCallback(
        (index: number) => {
            const newImages = images.filter((_, i) => i !== index);
            onImagesChange(newImages);
        },
        [images, onImagesChange],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            handleFileSelect(e.dataTransfer.files);
        },
        [handleFileSelect],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    return (
        <div className="space-y-4">
            <Label>
                {t('common.files.label')}
                <span className="ml-2 text-sm text-gray-500">({t('common.files.maxFiles', { count: maxImages })})</span>
            </Label>

            {/* Upload Area */}
            <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    dragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 hover:border-gray-400'
                } ${error ? 'border-error-500' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <LucideImagePlus className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-gray-600 dark:text-gray-400">{t('common.files.dropzone.title')}</p>
                <p className="mb-4 text-sm text-gray-500">{t('common.files.dropzone.subtitle', { size: maxSizeMB })}</p>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || images.length >= maxImages}
                >
                    {t('common.files.selectButton')}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    disabled={isLoading || images.length >= maxImages}
                />
            </div>

            <InputError message={error} />

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-full rounded-lg border object-cover"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 bg-red-500 p-0 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => removeImage(index)}
                                disabled={isLoading}
                            >
                                <LucideX className="h-3 w-3" />
                            </Button>
                            <p className="mt-1 truncate text-xs text-gray-500">{image.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
