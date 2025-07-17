import { RowData } from '@tanstack/react-table';

/**
 * Extension of \@tanstack/react-table module.
 * This module adds custom filter configurations and column metadata
 * to enhance the table functionality with additional filtering capabilities.
 */
declare module '@tanstack/react-table' {
    // Base properties for all filter variants
    interface FilterBaseConfig {
        displayName?: string; // User-friendly name for the filter
        alternativePropertyName?: string; // For cases where the filter should apply to a different property
    }

    // Specific configuration for a 'text' filter
    interface TextFilterConfig extends FilterBaseConfig {
        variant: 'text';
        ignoreCase?: boolean; // Default to true if not specified?
        placeholder?: string;
        isCollection?: boolean; // Is this filter for a collection of items?
        collectionProperty?: string; // Property for collection items, e.g., 'name' for text fields
    }

    // Specific configuration for a 'select' filter
    // TValue is the type of the individual option values
    interface SelectFilterConfig extends FilterBaseConfig {
        variant: 'select';
        // Options can be simple values or value-label pairs
        options: Array<{ value: string | number; label: string }>;
        multiple?: boolean; // Allow multiple selections?
    }

    // Specific configuration for a 'trueFalse' (boolean) filter
    interface TrueFalseFilterConfig extends FilterBaseConfig {
        variant: 'trueFalse';
        trueLabel?: string; // e.g., "Yes", "Active"
        falseLabel?: string; // e.g., "No", "Inactive"
        allowIndeterminate?: boolean; // For a third "all" state
    }

    // Specific configuration for a 'dateRange' filter
    interface DateRangeFilterConfig extends FilterBaseConfig {
        variant: 'dateRange';
        fromLabel?: string; // Label for the from date input, default "From"
        toLabel?: string; // Label for the to date input, default "To"
        dateFormat?: string; // Display format for dates, default locale format
    }

    interface NumberRangeFilterConfig extends FilterBaseConfig {
        variant: 'numberRange';
        minValue?: number; // Minimum value for the range
        maxValue?: number; // Maximum value for the range
    }

    // A discriminated union of all possible filter configurations
    // TValue is the type of the data in the column cells
    // TData is the type of the row data
    type ColumnFilterConfig = TextFilterConfig | SelectFilterConfig | TrueFalseFilterConfig | DateRangeFilterConfig | NumberRangeFilterConfig;

    // Extend ColumnMeta to include our custom filter configuration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterConfig?: ColumnFilterConfig;
    }
}
