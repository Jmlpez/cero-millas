import { BaseEntityActivable } from '@/contracts/common/base-entity-dto';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string.
 *
 * @param inputs - An array of class values to merge.
 * @returns The merged class names as a single string.
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

/**
 * Get a list of string from members (keys) of a given Enum
 *
 * @param enumType - Enum Type
 * @returns Enum members as a list of strings
 */
export const getEnumKeys = (enumType: Record<string, string | number>): Array<string> =>
    // https://github.com/microsoft/TypeScript/issues/17198
    // https://www.angularjswiki.com/angular/names-of-enums-typescript/

    Object.keys(enumType).filter((x) => Object.values(enumType).includes(x));

/**
 * Get a list of values from a given Enum type.
 * For numeric enums, it returns only the numeric values.
 * For string enums, it returns all values if no numeric values are found.
 *
 * @param enumType - Enum Type to extract values from
 * @returns Array of enum values (either strings or numbers)
 */
export const getEnumValues = (enumType: Record<string, string | number>): Array<string | number> => {
    let values = Object.values(enumType).filter((x) => !Object.keys(enumType).includes(x as never));
    if (!values.length) {
        values = Object.values(enumType);
    }
    return values;
};

/**
 * Safely converts a numeric enum value to its corresponding string key
 * @param enumObject - The enum object
 * @param value - The numeric enum value
 * @returns The enum key as a string, or null if invalid
 * @example
 * ```
 * enum Color {
 *   Red = 0,
 *   Blue = 1,
 *   Green = 2
 * }
 * getEnumKey(Color, 1) // returns "Blue"
 * getEnumKey(Color, 99) // returns null
 * ```
 */
export function getEnumKey<T extends Record<string, string | number>>(enumObject: T, value: unknown, fallback?: string | number): keyof T | null {
    if (value == null || typeof value !== 'number') {
        return null;
    }

    const enumKey = enumObject[value as number] as keyof T;

    // Verify the key actually exists in the enum
    if (enumKey === undefined || !(enumKey in enumObject)) {
        if (fallback !== undefined) {
            return String(fallback) as keyof T;
        }
        return null;
    }

    return enumKey;
}

/**
 * Safely converts a numeric enum value to its corresponding string key with fallback
 * @param enumObject - The enum object
 * @param value - The numeric enum value
 * @param fallback - Fallback value if conversion fails
 * @returns The enum key as a string, or the fallback value
 * @example
 * ``` ts
 * enum Color {
 *   Red = 0,
 *   Blue = 1,
 *   Green = 2
 * }
 *
 * getEnumKeyWithFallback(Color, 1) // returns "Blue"
 * getEnumKeyWithFallback(Color, 99, "Unknown") // returns "Unknown"
 * ```
 */
export function getEnumKeyWithFallback<T extends Record<string, string | number>>(enumObject: T, value: unknown, fallback: string = ''): string {
    const enumKey = getEnumKey(enumObject, value);
    return enumKey ? String(enumKey) : fallback;
}

/**
 * Sleep function (used only for testing and simulating delays)
 *
 * The function can be called as: await sleep(1000) or sleep(1000).then(...)
 *
 * @param ms - sleep time in milliseconds
 * @returns Empty Promise
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Implements the "nameof" operator.
 *
 * @example
 *
 *```ts
 * interface Person {
 *    firstName: string;
 *   lastName: string;
 * }
 *
 * const personName = nameof<Person>("firstName"); //returns "firstName"
 *```
 * Reference: https://schneidenbach.gitbooks.io/typescript-cookbook/content/nameof-operator.html
 *
 * @returns EnumListItems list
 */
export const nameofFactory =
    <T>() =>
    (name: keyof T): keyof T =>
        name;

/**
 * Guest user ID constant.
 */
export const GUEST_USER_ID = 0;

/**
 * Saves a value to local storage for a specific user.
 *
 * @param key - The key of the item to save.
 * @param value - The value to save.
 * @param userId - The ID of the user.
 */
export const saveToLSFromUser = (key: string, value: unknown, userId: number) => {
    if (value) localStorage.setItem(`user-${userId}-${key}`, JSON.stringify(value));
};

/**
 * Retrieves a value from local storage for a specific user.
 *
 * @param key - The key of the item to retrieve.
 * @param userId - The ID of the user.
 * @returns The value associated with the key for the specified user, or null if not found.
 */
export const getFromLSFromUser = (key: string, userId: number) => {
    const value = window.localStorage.getItem(`user-${userId}-${key}`);
    return value ? JSON.parse(value) : undefined;
};

/**
 * Saves a value to local storage
 *
 * @param key - The key of the item to save.
 * @param value - The value to save.
 */
export const saveToLS = (key: string, value: unknown) => {
    if (value) localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves a value from local storage
 *
 * @param key - The key of the item to retrieve.
 * @returns The value associated with the key for the specified user, or null if not found.
 */
export const getFromLS = (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
};

export const removeFromLS = (key: string) => {
    window.localStorage.removeItem(key);
};

// Type guard to check if an entity has isActive property
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasIsActiveProperty(entity: any): entity is BaseEntityActivable {
    return 'isActive' in entity && typeof entity.isActive === 'boolean';
}

export const EMPTY_FIELD = 'N/A'; // Used to display empty fields in the UI
