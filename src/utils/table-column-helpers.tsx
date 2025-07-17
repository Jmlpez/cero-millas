import { IdentifiedColumnDef, RowData } from '@tanstack/react-table';
import { EMPTY_FIELD } from '@utils';
import { LucideCalendar } from 'lucide-react';

interface DateColumnOptions {
    /**
     * Translation key for the column header
     */
    header: string;
    /**
     * Custom date formatting function. Defaults to toLocaleDateString()
     */
    formatDate?: (date: Date) => string;
    /**
     * Whether to enable sorting for this column. Defaults to true
     */
    enableSorting?: boolean;
    /**
     * Whether to enable filtering for this column. Defaults to true
     */
    enableColumnFilter?: boolean;
}

/**
 * Creates a standardized date column configuration for react-table
 *
 * @param options - Configuration options for the date column
 * @returns Column definition for a date field with consistent formatting and filtering
 */
export function createDateColumn<TData extends RowData, TValue = Date>(options: DateColumnOptions): IdentifiedColumnDef<TData, TValue> {
    const { header, formatDate = (date: Date) => date.toLocaleDateString(), enableSorting = true, enableColumnFilter = true } = options;

    return {
        header,
        cell: ({ getValue }) => {
            const date = getValue() as Date;
            if (!date) return EMPTY_FIELD;
            return (
                <div className="flex items-center gap-2">
                    <LucideCalendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formatDate(new Date(date))}</span>
                </div>
            );
        },
        enableSorting,
        enableColumnFilter,
        ...(enableColumnFilter && {
            meta: {
                filterConfig: {
                    variant: 'dateRange' as const,
                },
            },
        }),
    } as IdentifiedColumnDef<TData, TValue>;
}

/**
 * Creates a standardized text column configuration for react-table
 *
 * @param header -  Translation key for the column header
 * @param enableFilter -  Whether to enable filtering. Defaults to true
 * @param enableSorting -  Whether to enable sorting. Defaults to true
 * @returns Column definition for a text field
 */
export function createTextColumn<TData extends RowData, TValue = string>(
    header: string,
    enableFilter: boolean = true,
    enableSorting: boolean = true,
): IdentifiedColumnDef<TData, TValue> {
    return {
        header,
        cell: ({ getValue }) => getValue() ?? EMPTY_FIELD,
        enableColumnFilter: enableFilter,
        enableSorting: enableSorting,
        ...(enableFilter && {
            meta: {
                filterConfig: {
                    variant: 'text' as const,
                },
            },
        }),
    } as IdentifiedColumnDef<TData, TValue>;
}

/**
 * Creates a standardized number range column configuration for react-table
 *
 * @param header - Translation key for the column header
 * @param formatNumber - Optional number formatting function
 * @returns Column definition for a number field with range filtering
 */
export function createNumberRangeColumn<TData extends RowData, TValue = number>(
    header: string,
    formatNumber?: (value: number) => string,
    enableFilter: boolean = true,
    enableSorting: boolean = true,
): IdentifiedColumnDef<TData, TValue> {
    return {
        header,
        cell: ({ getValue }) => {
            const value = getValue() as number;
            if (value === null || value === undefined) return EMPTY_FIELD;
            return formatNumber ? formatNumber(value) : value.toString();
        },
        enableColumnFilter: enableFilter,
        enableSorting: enableSorting,
        filterFn: () => true, // Workaround for number range filter
        meta: {
            filterConfig: {
                variant: 'numberRange' as const,
            },
        },
    } as IdentifiedColumnDef<TData, TValue>;
}
