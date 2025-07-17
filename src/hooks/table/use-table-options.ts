import { getDefaultPagination } from '@/lib/defaults';
import { buildODataFilters, buildODataSorting, extractColumnMetadata } from '@/lib/odata-filter-builder';
import { getFromLS, removeFromLS, saveToLS } from '@/lib/utils';
import { ApiError } from '@/services/http-client-types';
import { PagedResult } from '@/types/common';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { Filter, OrderBy } from 'odata-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseTableOptions<TData> {
    /** Unique identifier for the table to store state in localStorage */
    tableId: string;
    /** Column definitions for the table */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<TData, any>[];
    /** Function to fetch data with OData parameters */
    queryFn: (pagination: PaginationState, sorting?: OrderBy<TData>, filters?: Filter<TData>) => Promise<PagedResult<TData[]>>;
    /** Query key for react-query cache */
    queryKey: QueryKey;
    /** Additional query options for react-query */
    queryOptions?: Partial<UseQueryOptions<PagedResult<TData[]>, ApiError>>;
    /** Enable/disable localStorage persistence (default: true) */
    enablePersistence?: boolean;
    /** Default sorting state */
    defaultSorting?: SortingState;
    /** Enable debug mode for react-table */
    debugTable?: boolean;
}

interface UseTableOptionsReturn<TData> {
    // Table instance and data
    table: ReturnType<typeof useReactTable<TData>>;
    tableData: TData[];

    // Query states
    isLoading: boolean;
    isPending: boolean;
    status: 'error' | 'success' | 'pending';
    isPlaceholderData: boolean;

    // Pagination
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    totalRowCount: number;

    // Sorting
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;

    // Filtering
    pendingFilters: ColumnFiltersState;
    setPendingFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    appliedFilters: ColumnFiltersState;
    setAppliedFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    hasUnappliedFilters: boolean;

    // Row selection
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;

    // Filter actions
    applyFilters: () => void;
    clearFilters: () => void;

    // OData queries
    odataFilters?: Filter<TData>;
    odataSorting?: OrderBy<TData>;

    // Persistence
    clearPersistedState: () => void;
}

const STORAGE_KEYS = {
    pagination: (tableId: string) => `table-${tableId}-pagination`,
    sorting: (tableId: string) => `table-${tableId}-sorting`,
    filters: (tableId: string) => `table-${tableId}-filters`,
} as const;

export function useTableOptions<TData>({
    tableId,
    columns,
    queryFn,
    queryKey,
    queryOptions = {},
    enablePersistence = true,
    defaultSorting = [],
    debugTable = false,
}: UseTableOptions<TData>): UseTableOptionsReturn<TData> {
    // Initialize states with localStorage values or defaults
    const [pagination, setPagination] = useState<PaginationState>(() => {
        if (enablePersistence) {
            const stored = getFromLS(STORAGE_KEYS.pagination(tableId));
            return stored || getDefaultPagination();
        }
        return getDefaultPagination();
    });

    const [sorting, setSorting] = useState<SortingState>(() => {
        if (enablePersistence) {
            const stored = getFromLS(STORAGE_KEYS.sorting(tableId));
            return stored || defaultSorting;
        }
        return defaultSorting;
    });

    const [appliedFilters, setAppliedFilters] = useState<ColumnFiltersState>(() => {
        if (enablePersistence) {
            const stored = getFromLS(STORAGE_KEYS.filters(tableId));
            return stored || [];
        }
        return [];
    });

    const [pendingFilters, setPendingFilters] = useState<ColumnFiltersState>(appliedFilters);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    // Persist state changes to localStorage
    useEffect(() => {
        if (enablePersistence) {
            saveToLS(STORAGE_KEYS.pagination(tableId), pagination);
        }
    }, [pagination, tableId, enablePersistence]);

    useEffect(() => {
        if (enablePersistence) {
            saveToLS(STORAGE_KEYS.sorting(tableId), sorting);
        }
    }, [sorting, tableId, enablePersistence]);

    useEffect(() => {
        if (enablePersistence) {
            saveToLS(STORAGE_KEYS.filters(tableId), appliedFilters);
        }
    }, [appliedFilters, tableId, enablePersistence]);

    // Build OData queries
    const odataFilters = useMemo(() => {
        const columnMetadata = extractColumnMetadata(columns);
        return buildODataFilters<TData>(appliedFilters, columnMetadata);
    }, [appliedFilters, columns]);

    const odataSorting = useMemo(() => {
        const columnMetadata = extractColumnMetadata(columns);
        return buildODataSorting(sorting, columnMetadata);
    }, [columns, sorting]);

    // Filter actions
    const applyFilters = useCallback(() => {
        setAppliedFilters([...pendingFilters]);
        // Reset pagination when applying filters
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [pendingFilters]);

    const clearFilters = useCallback(() => {
        setPendingFilters([]);
        setAppliedFilters([]);
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, []);

    const clearPersistedState = useCallback(() => {
        if (enablePersistence) {
            removeFromLS(STORAGE_KEYS.pagination(tableId));
            removeFromLS(STORAGE_KEYS.sorting(tableId));
            removeFromLS(STORAGE_KEYS.filters(tableId));
        }
        setPagination(getDefaultPagination());
        setSorting(defaultSorting);
        setAppliedFilters([]);
        setPendingFilters([]);
        setRowSelection({});
    }, [tableId, enablePersistence, defaultSorting]);

    // Check for unapplied filters
    const hasUnappliedFilters = useMemo(() => {
        return JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);
    }, [pendingFilters, appliedFilters]);

    // Query data
    const {
        data: serverResponse,
        isPending,
        isLoading,
        status,
        isPlaceholderData,
    } = useQuery<PagedResult<TData[]>, ApiError>({
        queryKey: [...queryKey, pagination, odataFilters, odataSorting],
        queryFn: async () => {
            return await queryFn(pagination, odataSorting, odataFilters);
        },
        placeholderData: (previousData) => previousData,
        ...queryOptions,
    });

    // Extract table data and pagination meta
    const tableData = useMemo(() => serverResponse?.data ?? [], [serverResponse?.data]);
    const paginationMeta = useMemo(() => serverResponse?.pagination, [serverResponse?.pagination]);

    // Create table instance
    const table = useReactTable<TData>({
        data: tableData,
        columns,
        state: {
            sorting,
            columnFilters: pendingFilters,
            pagination,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setPendingFilters,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,

        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,

        rowCount: paginationMeta?.totalCount ?? 0,
        getCoreRowModel: getCoreRowModel(),
        debugTable,
    });

    return {
        // Table instance and data
        table,
        tableData,

        // Query states
        isLoading,
        isPending,
        status,
        isPlaceholderData,

        // Pagination
        pagination,
        setPagination,
        totalRowCount: paginationMeta?.totalCount ?? 0,

        // Sorting
        sorting,
        setSorting,

        // Filtering
        pendingFilters,
        setPendingFilters,
        appliedFilters,
        setAppliedFilters,
        hasUnappliedFilters,

        // Row selection
        rowSelection,
        setRowSelection,

        // Filter actions
        applyFilters,
        clearFilters,

        // OData queries
        odataFilters,
        odataSorting,

        // Persistence
        clearPersistedState,
    };
}
