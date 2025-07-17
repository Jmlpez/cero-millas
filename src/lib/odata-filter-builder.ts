import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { Filter, OrderBy } from 'odata-query';

interface ExtractedColumnMetadata {
    alternativePropertyName?: string;
    isTextField?: boolean;
    isCollection?: boolean;
    collectionProperty?: string; // Property for collection items, e.g., 'name' for text fields
    isDateRange?: boolean; // Property for date range filters
    isNumberRange?: boolean; // Property for number range filters
}

/**
 * Extracts filtering metadata from react-table columns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractColumnMetadata(columns: any[]): Record<string, ExtractedColumnMetadata> {
    return columns.reduce(
        (acc, column) => {
            // Get the column ID from different sources depending on the column type
            let columnId: string | undefined;

            if (column.id) {
                columnId = column.id;
            } else if (column.columnDef?.id) {
                columnId = column.columnDef.id;
            } else if (column.columnDef?.accessorKey) {
                columnId = String(column.columnDef.accessorKey);
            } else if (column.accessorKey) {
                columnId = String(column.accessorKey);
            }

            const filterConfig = column?.meta?.filterConfig;

            if (filterConfig && columnId) {
                acc[columnId] = {
                    alternativePropertyName: filterConfig.alternativePropertyName,
                    isTextField: filterConfig.variant === 'text',
                    isCollection: filterConfig.isCollection ?? false, // Default to false if not specified
                    collectionProperty: filterConfig.collectionProperty || 'name', // Default to 'name' if not specified
                    isDateRange: filterConfig.variant === 'dateRange', // New property
                    isNumberRange: filterConfig.variant === 'numberRange', // New property
                };
            }
            return acc;
        },
        {} as Record<string, ExtractedColumnMetadata>,
    );
}

/**
 *
 * @typeParam TDto - The data transfer object type for type-safe property access
 * @param filters - The column filters state from TanStack React Table containing filter configurations
 * @param columnMetadata - Optional metadata mapping for columns containing filter behavior configuration
 * @returns An OData Filter configuration with AND logic combining all filters, or undefined if no filters are applied
 *
 * @remarks
 * - Combines multiple column filters using AND logic
 * - Supports different filter value types: string, number, boolean, and arrays
 * - For string values, uses case-insensitive contains matching when isTextField is true
 * - For collection properties, applies filters using OData 'any' operator with sub-property matching
 * - For array values with strings and text fields, uses OR logic with contains matching
 * - For array values with non-text fields, uses 'in' operator
 * - Falls back to property names from filter.id when no alternativePropertyName is provided
 * - Auto-detects text fields when no metadata is provided by checking if filter value is string
 *
 * @example
 * ```typescript
 * const filters = [
 *   { id: 'name', value: 'john' },
 *   { id: 'age', value: 25 },
 *   { id: 'tags', value: ['active', 'premium'] }
 * ];
 * const metadata = {
 *   name: { isTextField: true },
 *   tags: { isCollection: true, collectionProperty: 'label' }
 * };
 * const filter = buildODataFilters<User>(filters, metadata);
 * // Result: { and: [contains filter for name, eq filter for age, any filter for tags] }
 * ```
 */
export function buildODataFilters<TDto>(
    filters?: ColumnFiltersState,
    columnMetadata?: Record<string, ExtractedColumnMetadata>,
): Filter<TDto> | undefined {
    if (!filters || filters.length === 0) return undefined;

    const filterConditions: Filter<TDto>[] = filters.map((filter) => {
        const metadata = columnMetadata?.[filter.id];
        const propertyName = metadata?.alternativePropertyName || filter.id;
        const filterValue = filter.value;
        const isTextField = metadata?.isTextField ?? typeof filterValue === 'string'; // Fallback
        const isCollection = metadata?.isCollection;
        const isDateRange = metadata?.isDateRange;
        const isNumberRange = metadata?.isNumberRange;

        // Handle date range filters
        if (isDateRange && filterValue && typeof filterValue === 'object' && !Array.isArray(filterValue)) {
            const dateRange = filterValue as { from?: Date; to?: Date };
            const conditions: Filter<TDto>[] = [];

            if (dateRange.from) {
                const fromDate = new Date(dateRange.from);
                // fromDate.setUTCHours(0, 0, 0, 0); // Start of day
                conditions.push({ [propertyName]: { ge: fromDate } });
            }

            if (dateRange.to) {
                const toDate = new Date(dateRange.to);
                // toDate.setUTCHours(23, 59, 59, 999); // End of day
                conditions.push({ [propertyName]: { le: toDate } });
            }

            if (conditions.length === 1) {
                return conditions[0];
            } else if (conditions.length === 2) {
                return { and: conditions };
            }

            return {};
        }

        if (isNumberRange && filterValue && typeof filterValue === 'object' && !Array.isArray(filterValue)) {
            const numberRange = filterValue as { from?: string; to?: string };
            const conditions: Filter<TDto>[] = [];

            if (numberRange.from && numberRange.from.trim() !== '') {
                const fromNumber = Number(numberRange.from);
                if (!isNaN(fromNumber)) {
                    conditions.push({ [propertyName]: { ge: fromNumber } });
                }
            }

            if (numberRange.to && numberRange.to.trim() !== '') {
                const toNumber = Number(numberRange.to);
                if (!isNaN(toNumber)) {
                    conditions.push({ [propertyName]: { le: toNumber } });
                }
            }

            if (conditions.length === 1) {
                return conditions[0];
            } else if (conditions.length === 2) {
                return { and: conditions };
            }

            return {};
        }

        // Handle different filter types
        if (typeof filterValue === 'number') {
            return { [propertyName]: { eq: filterValue } };
        } else if (typeof filterValue === 'string') {
            if (isTextField) {
                if (isCollection) {
                    const subProp = metadata?.collectionProperty || 'name'; // default a 'name'
                    return {
                        [propertyName]: {
                            any: {
                                [`contains(tolower(${subProp}), tolower('${filterValue}'))`]: true,
                            },
                        },
                    };
                }
                return {
                    [`contains(tolower(${propertyName}), tolower('${filterValue}'))`]: true,
                };
            } else {
                return { [propertyName]: { eq: filterValue } };
            }
        } else if (Array.isArray(filterValue)) {
            if (filterValue.length > 0 && typeof filterValue[0] === 'string' && isTextField) {
                const stringConditions = filterValue.map((value) => ({
                    [`contains(tolower(${propertyName}), tolower('${value}'))`]: true,
                }));
                return { or: stringConditions };
            }
            return { [propertyName]: { in: filterValue } };
        } else if (typeof filterValue === 'boolean') {
            return { [propertyName]: { eq: filterValue } };
        }
        return {};
    });

    return { and: filterConditions };
}

/**
 * Builds OData sorting configuration from TanStack table sorting state.
 *
 * @typeParam TDto - The data transfer object type for type-safe property access
 * @param sorting - The sorting state from TanStack React Table containing column sort configurations
 * @returns An OData OrderBy configuration for the primary sort column, or undefined if no sorting is applied
 *
 * @remarks
 * - Only processes the first (primary) sort column from the sorting state
 * - Maps TanStack table sort direction (`desc` boolean) to OData format ('asc' | 'desc')
 * - Returns undefined when no sorting is configured or sorting array is empty
 *
 * @example
 * ```typescript
 * const sorting = [{ id: 'name', desc: false }, { id: 'age', desc: true }];
 * const orderBy = buildODataSorting<User>(sorting);
 * // Result: [['name', 'asc'], ['age', 'desc']]
 * ```
 */
export const buildODataSorting = <TDto>(
    sorting?: SortingState,
    columnMetadata?: Record<string, ExtractedColumnMetadata>,
): OrderBy<TDto> | undefined => {
    if (!sorting || sorting.length === 0) return undefined;

    const PRIMARY_SORT_INDEX = 0;
    const primarySortColumn = sorting[PRIMARY_SORT_INDEX];

    const metadata = columnMetadata?.[primarySortColumn.id];
    const propertyName = metadata?.alternativePropertyName || primarySortColumn.id;

    const sortingProperty = propertyName as keyof TDto;
    const sortingDirection = primarySortColumn.desc ? 'desc' : 'asc';

    return [[sortingProperty, sortingDirection]] as OrderBy<TDto>;
};
