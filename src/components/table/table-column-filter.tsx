import { Column } from '@tanstack/react-table';
import { Button } from '@ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { CheckIcon, LucideCalendar, LucideHash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface DateRange {
    from?: Date;
    to?: Date;
}

// To allow undefined/null behavior easily use string instead of numbers (the inputs itselfs are type number though)
export interface NumberRange {
    from?: string;
    to?: string;
}

interface TableColumnFilterProps<T> {
    column: Column<T>;
}

export const fromISOStringToDateRange = (dateRange: DateRange | undefined): DateRange => {
    if (!dateRange) return {};

    const from = dateRange.from ? new Date(dateRange.from) : undefined;
    const to = dateRange.to ? new Date(dateRange.to) : undefined;

    return { from, to };
};

/**
 * TableColumnFilter is a reusable React component for filtering table columns.
 * It supports four types of filters: a dropdown select filter, a text input filter, a true/false filter, and a date range filter.
 *
 * T - The type of data being filtered in the table column.
 * @param props - The component props that contains the column object from react-table, which provides
 * methods and metadata for managing the filter state.
 *
 * @returns JSX.Element A filter UI for the table column, either a dropdown menu, a text input, or date range inputs.
 *
 * @remarks
 * - If the column's filter configuration (`filterConfig`) specifies a `select` variant,
 *   a dropdown menu is rendered with options for filtering.
 * - If the filter configuration specifies a `trueFalse` variant,
 *   a dropdown menu with true/false options is rendered (like radio buttons).
 * - If the filter configuration specifies a `dateRange` variant,
 *   date range inputs are rendered for filtering by date ranges.
 * - If the filter configuration specifies a `number` variant,
 *   number range inputs are rendered for filtering by number ranges.
 * - Otherwise, a debounced text input is rendered for free-text filtering.
 */
const TableColumnFilter = <T,>(props: TableColumnFilterProps<T>) => {
    const { column } = props;
    const { t } = useTranslation();

    // State needed to control the dropdown menu visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const columnFilterValue = column.getFilterValue();
    const { filterConfig } = column.columnDef.meta || {};

    const columnLabel = filterConfig?.displayName ?? String(column.columnDef.header);

    // For text input, use local temporary state to avoid unnecessary re-renders
    const [tempTextValue, setTempTextValue] = useState((columnFilterValue as string) ?? '');

    // For date range filter
    const [tempDateRange, setTempDateRange] = useState<DateRange>(() => {
        return fromISOStringToDateRange(columnFilterValue as DateRange);
    });

    const [tempNumberRange, setTempNumberRange] = useState<NumberRange>(() => {
        return (columnFilterValue as NumberRange) ?? {};
    });

    // Synchronize when filter changes from outside (e.g when clearing the filters)
    useEffect(() => {
        setTempTextValue((columnFilterValue as string) ?? '');
        setTempDateRange(fromISOStringToDateRange(columnFilterValue as DateRange));
        setTempNumberRange((columnFilterValue as NumberRange) ?? {});
    }, [columnFilterValue]);

    // Determine the trigger button label based on current filter value
    let triggerButtonLabel: string | undefined = columnLabel;
    let isPlaceholder = true;

    if (columnFilterValue !== undefined && columnFilterValue !== null) {
        if (filterConfig?.variant === 'select' && filterConfig?.options) {
            // Logic for select filters (multiple or single)
            const selectedValues = Array.isArray(columnFilterValue) ? columnFilterValue : [columnFilterValue];
            if (selectedValues.length > 0) {
                if (filterConfig.multiple) {
                    triggerButtonLabel =
                        selectedValues.length === 1
                            ? filterConfig.options.find((opt) => opt.value === selectedValues[0])?.label
                            : `${selectedValues.length} ${t('common.tables.filters.selected')}`;
                } else {
                    triggerButtonLabel = filterConfig.options.find((opt) => opt.value === selectedValues[0])?.label;
                }
                isPlaceholder = false;
            }
        } else if (filterConfig?.variant === 'trueFalse') {
            // Logic for true/false filters
            const boolValue = columnFilterValue as boolean;
            if (boolValue === true) {
                triggerButtonLabel = filterConfig.trueLabel || 'Yes';
            } else if (boolValue === false) {
                triggerButtonLabel = filterConfig.falseLabel || 'No';
            }
            isPlaceholder = false;
        } else if (filterConfig?.variant === 'dateRange') {
            // Logic for date range filters
            const dateRange = columnFilterValue as DateRange;
            if (dateRange.from || dateRange.to) {
                const fromStr = dateRange.from ? new Date(dateRange.from).toLocaleDateString() : '';
                const toStr = dateRange.to ? new Date(dateRange.to).toLocaleDateString() : '';
                if (fromStr && toStr) {
                    triggerButtonLabel = `${fromStr} - ${toStr}`;
                } else if (fromStr) {
                    triggerButtonLabel = `${t('common.tables.filters.from')} ${fromStr}`;
                } else if (toStr) {
                    triggerButtonLabel = `${t('common.tables.filters.to')} ${toStr}`;
                }
                isPlaceholder = false;
            }
        } else if (filterConfig?.variant === 'numberRange') {
            // Logic for number range filters
            const numberRange = columnFilterValue as NumberRange;
            if (numberRange.from !== undefined || numberRange.to !== undefined) {
                const fromStr = numberRange.from !== undefined ? numberRange.from.toString() : '';
                const toStr = numberRange.to !== undefined ? numberRange.to.toString() : '';
                if (fromStr && toStr) {
                    triggerButtonLabel = `${fromStr} - ${toStr}`;
                } else if (fromStr) {
                    triggerButtonLabel = `${t('common.tables.filters.from')} ${fromStr}`;
                } else if (toStr) {
                    triggerButtonLabel = `${t('common.tables.filters.to')} ${toStr}`;
                }
                isPlaceholder = false;
            }
        }
    }

    return (
        <>
            {filterConfig?.variant === 'select' ? (
                <DropdownMenu
                    modal={false}
                    open={isDropdownOpen}
                    onOpenChange={(open) => {
                        setIsDropdownOpen(open);
                    }}
                >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-start px-2 text-left text-base font-normal"
                        >
                            <span className={isPlaceholder ? 'text-gray-700 dark:text-gray-400' : ''}>{triggerButtonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto bg-white">
                        <DropdownMenuLabel>{`Filter by ${columnLabel}`}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {filterConfig?.options?.map((option) => {
                                // Always normalize to array for consistent logic
                                const currentValues = Array.isArray(columnFilterValue)
                                    ? (columnFilterValue as string[])
                                    : columnFilterValue
                                      ? [columnFilterValue as string]
                                      : [];

                                const isChecked = currentValues.includes(option.value.toString());

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={option.value}
                                        checked={isChecked}
                                        onSelect={(e) => {
                                            // prevent from closing the dropdown
                                            e.preventDefault();
                                        }}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                // Add value to filter
                                                if (filterConfig.multiple) {
                                                    // For multiple selection: add to array
                                                    if (!currentValues.includes(option.value.toString())) {
                                                        const newValues = [...currentValues, option.value.toString()];
                                                        column.setFilterValue(newValues);
                                                    }
                                                } else {
                                                    // For single selection: replace with array containing one element
                                                    column.setFilterValue([option.value.toString()]);
                                                }
                                            } else {
                                                // Remove value from filter
                                                const newValues = currentValues.filter((v) => v !== option.value.toString());
                                                column.setFilterValue(newValues.length > 0 ? newValues : undefined);
                                            }
                                        }}
                                    >
                                        <span className="capitalize">{option.label}</span>
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : filterConfig?.variant === 'trueFalse' ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="dark:bg-gray-dark justify-start px-2 text-left text-base font-normal"
                        >
                            <span className={isPlaceholder ? 'text-gray-700 dark:text-gray-400' : ''}>{triggerButtonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto bg-white">
                        <DropdownMenuLabel>
                            {t('common.tables.filters.filterBy')} {columnLabel}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {/* Option to clear filter - shows all records */}
                            <DropdownMenuItem
                                onClick={() => {
                                    column.setFilterValue(undefined);
                                }}
                            >
                                <span className="text-gray-500">{t('common.tables.filters.all')}</span>
                                {columnFilterValue === undefined && (
                                    <span className="ml-auto">
                                        <CheckIcon />
                                    </span>
                                )}
                            </DropdownMenuItem>

                            {/* True option - filters for truthy values */}
                            <DropdownMenuItem
                                onClick={() => {
                                    column.setFilterValue(true);
                                }}
                            >
                                <span>{filterConfig.trueLabel || 'Yes'}</span>
                                {columnFilterValue === true && (
                                    <span className="ml-auto">
                                        <CheckIcon />
                                    </span>
                                )}
                            </DropdownMenuItem>

                            {/* False option - filters for falsy values */}
                            <DropdownMenuItem
                                onClick={() => {
                                    column.setFilterValue(false);
                                }}
                            >
                                <span>{filterConfig.falseLabel || 'No'}</span>
                                {columnFilterValue === false && (
                                    <span className="ml-auto">
                                        <CheckIcon />
                                    </span>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : filterConfig?.variant === 'dateRange' ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-start px-2 text-left text-base font-normal"
                        >
                            <LucideCalendar className="mr-2 h-4 w-4" />
                            <span className={isPlaceholder ? 'text-gray-700 dark:text-gray-400' : ''}>{triggerButtonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto bg-white p-4">
                        <DropdownMenuLabel className="mb-2">
                            {t('common.tables.filters.filterBy')} {columnLabel}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="space-y-3 pt-2">
                            <div>
                                <Label
                                    htmlFor="date-from"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    {filterConfig.fromLabel || t('common.tables.filters.from')}
                                </Label>
                                <Input
                                    id="date-from"
                                    type="date"
                                    value={tempDateRange.from ? tempDateRange.from.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value ? new Date(e.target.value) : undefined;
                                        const newRange = { ...tempDateRange, from: newDate };
                                        setTempDateRange(newRange);
                                        column.setFilterValue(newRange.from || newRange.to ? newRange : undefined);
                                    }}
                                    className="w-full"
                                    onKeyDown={(e) => {
                                        // This is to allow moving using tabs inside a dropdown
                                        if (e.key == 'Tab') {
                                            e.stopPropagation();
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="date-to"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    {filterConfig.toLabel || t('common.tables.filters.to')}
                                </Label>
                                <Input
                                    id="date-to"
                                    type="date"
                                    value={tempDateRange.to ? tempDateRange.to.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value ? new Date(e.target.value) : undefined;
                                        const newRange = { ...tempDateRange, to: newDate };
                                        setTempDateRange(newRange);
                                        column.setFilterValue(newRange.from || newRange.to ? newRange : undefined);
                                    }}
                                    className="w-full"
                                    onKeyDown={(e) => {
                                        // This is to allow moving using tabs inside a dropdown
                                        if (e.key == 'Tab') {
                                            e.stopPropagation();
                                        }
                                    }}
                                />
                            </div>
                            {(tempDateRange.from || tempDateRange.to) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setTempDateRange({});
                                        column.setFilterValue(undefined);
                                    }}
                                    className="w-full"
                                >
                                    {t('common.tables.filters.clear')}
                                </Button>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : filterConfig?.variant === 'numberRange' ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-start px-2 text-left text-base font-normal"
                        >
                            <LucideHash className="mr-2 h-4 w-4" />
                            <span className={isPlaceholder ? 'text-gray-700 dark:text-gray-400' : ''}>{triggerButtonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto bg-white p-4">
                        <DropdownMenuLabel className="mb-2">
                            {t('common.tables.filters.filterBy')} {columnLabel}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="space-y-3 pt-2">
                            {/* <div>
                                <Input
                                    type="number"
                                    value={tempTesting ?? ''}
                                    placeholder="number"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const num = Number(value);
                                        setTempTesting(value);
                                        column.setFilterValue(value);
                                    }}
                                />
                            </div> */}
                            <div>
                                <Label
                                    htmlFor="number-from"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    {t('common.tables.filters.from')}
                                </Label>
                                <Input
                                    id="number-from"
                                    type="number"
                                    value={tempNumberRange.from ?? ''}
                                    onChange={(e) => {
                                        const newValue = e.target.value || undefined;
                                        const newRange = { ...tempNumberRange, from: newValue };
                                        setTempNumberRange(newRange);
                                        const hasValidRange =
                                            (newRange.from && newRange.from.trim() !== '') || (newRange.to && newRange.to.trim() !== '');
                                        column.setFilterValue(hasValidRange ? newRange : undefined);
                                    }}
                                    onKeyDown={(e) => {
                                        // This is to allow moving using tabs inside a dropdown
                                        if (e.key == 'Tab') {
                                            e.stopPropagation();
                                        }
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="number-to"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    {t('common.tables.filters.to')}
                                </Label>
                                <Input
                                    id="number-to"
                                    type="number"
                                    step={0.1}
                                    value={tempNumberRange.to ?? ''}
                                    onChange={(e) => {
                                        const newValue = e.target.value || undefined;
                                        const newRange = { ...tempNumberRange, to: newValue };
                                        setTempNumberRange(newRange);

                                        const hasValidRange =
                                            (newRange.from && newRange.from.trim() !== '') || (newRange.to && newRange.to.trim() !== '');
                                        column.setFilterValue(hasValidRange ? newRange : undefined);
                                    }}
                                    className="w-full"
                                    onKeyDown={(e) => {
                                        // This is to allow moving using tabs inside a dropdown
                                        if (e.key == 'Tab') {
                                            e.stopPropagation();
                                        }
                                    }}
                                />
                            </div>
                            {(tempNumberRange.from || tempNumberRange.to) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setTempNumberRange({});
                                        column.setFilterValue(undefined);
                                    }}
                                    className="w-full"
                                >
                                    {t('common.tables.filters.clear')}
                                </Button>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                // Default text input filter for free-text search
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={tempTextValue}
                        onChange={(e) => {
                            setTempTextValue(e.target.value);
                            // Set filter value, undefined if empty to clear the filter
                            column.setFilterValue(e.target.value || undefined);
                        }}
                        placeholder={`${columnLabel}`}
                        className="dark:bg-gray-dark bg-white"
                    />
                </div>
            )}
        </>
    );
};
export default TableColumnFilter;
