import { getImageUrl, ImageSize } from '@/lib/images';
import { cn } from '@utils';
import React, { forwardRef } from 'react';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    /**
     * Image path or URL. If it's a relative path, it will be converted to absolute URL
     */
    src: string;
    /**
     * Image size variant (used for different image endpoints if needed)
     * @defaultValue 'original'
     */
    size?: ImageSize;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ src, size = 'original', onError, onLoad, className = '', alt = '', ...props }, ref) => {
        const imageUrl = getImageUrl(src, size);

        return (
            <img
                ref={ref}
                src={imageUrl}
                alt={alt}
                className={cn('image-fallback', className)}
                {...props}
            />
        );
    },
);

Image.displayName = 'Image';
