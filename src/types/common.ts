export interface PaginationMetadata {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface PagedResult<T> {
    data: T;
    pagination: PaginationMetadata;
}
