import { PaginationState } from '@tanstack/react-table';

export const getDefaultPagination = (): PaginationState => ({
    pageIndex: 0,
    pageSize: 10,
});
