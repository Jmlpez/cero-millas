export type ImageSize = 'original' | 'medium' | 'small' | 'thumbnail';
const DEFAULT_IMAGE_EXTENSION = 'webp'; // Default image extension

/**
 * Generates a URL for an image with the specified size variant.
 *
 * This function transforms an image path by:
 * 1. Adding a size suffix to the filename (e.g., "_original", "_medium", "_small", "_thumbnail")
 * 2. Converting the file extension to the default format (webp)
 * 3. Prepending the base URL from environment variables if available
 *
 * @param imagePath - The original image path/filename to transform
 * @param imageType - The desired image size variant. Defaults to 'original'
 * @returns The complete image URL with size suffix and proper extension, or empty string if no imagePath provided
 *
 * @example
 * ```typescript
 * // With base URL configured
 * getImageUrl("profile.jpg", "thumbnail")
 * // Returns: "https://example.com/images/profile_thumbnail.webp"
 *
 * // Without base URL
 * getImageUrl("avatar.png", "medium")
 * // Returns: "avatar_medium.webp"
 *
 * // Default size (original)
 * getImageUrl("photo.jpeg")
 * // Returns: "photo_original.webp"
 * ```
 */
export const getImageUrl = (imagePath: string, imageType: ImageSize = 'original'): string => {
    if (!imagePath) {
        return ''; // if no imagePath, return an empty string
    }

    // Transform the imagePath to match the expected image type
    const imageTypeSuffix = `_${imageType}`;
    const imageNameParts = imagePath.split('.');
    const finalImagePath = `${imageNameParts[0]}${imageTypeSuffix}.${DEFAULT_IMAGE_EXTENSION}`;

    const baseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

    if (!baseUrl) {
        return finalImagePath; // if no baseUrl, return the path as is
    }

    const cleanPath = finalImagePath.startsWith('/') ? finalImagePath.slice(1) : finalImagePath;
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    // let endpoint = cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;

    // Example:
    // If baseUrl is "https://example.com/images/" and imagePath is "/images/some_image_large_id.jpg"
    // then the result will be "https://example.com/images/some_image_large_id_original.webp"
    return `${cleanBase}/${cleanPath}`;
};
