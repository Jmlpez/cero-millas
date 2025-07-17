import { ApiError } from '@/services/http-client-types';

/**
 * Extracts specific errors from array elements from API errors
 * Converts errors like "Items[0].UnitPrice" into a flat object
 */
export const extractItemErrors = (apiError: ApiError | null): { [key: string]: string } => {
    if (!apiError) return {};

    const errors = apiError.getErrors();
    if (!errors) return {};

    const itemErrors: { [key: string]: string } = {};

    Object.entries(errors).forEach(([fieldPath, messages]) => {
        // Only process errors that match the Items[index].Field pattern
        if (fieldPath.match(/^items\[\d+\]\./)) {
            itemErrors[fieldPath] = messages[0];
        }
    });

    return itemErrors;
};

/**
 * Checks if there are errors related to items
 */
export const hasItemsErrors = (apiError: ApiError | null): boolean => {
    if (!apiError) return false;

    const errors = apiError.getErrors();
    if (!errors) return false;

    return Object.keys(errors).some((fieldPath) => fieldPath.match(/^items\[\d+\]\./));
};
