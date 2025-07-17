import { PagedResult } from '@/types/common';
import { HttpClient } from '@services/http-client';
import { RequestOptions } from '@services/http-client-types';
import { PaginationState } from '@tanstack/react-table';
import buildQuery, { Filter, OrderBy } from 'odata-query';

/**
 * Type for query parameters that can be passed to API methods.
 * Supports string, number, boolean values, arrays, and null/undefined (which are filtered out).
 */
type QueryParams = Record<string, string | number | boolean | (string | number)[] | null | undefined>;

/**
 * Abstract base class for API clients that provides common CRUD operations.
 * This class serves as a foundation for specific API clients by encapsulating
 * HTTP communication and endpoint management.
 *
 * @example
 * ```ts
 * class UserApiClient extends BaseApiClient {
 *   constructor(httpClient: HttpClient) {
 *     super('/api/users', httpClient);
 *   }
 * }
 * ```
 */
export abstract class BaseApiClient {
    /**
     * HTTP client instance used for making requests.
     */
    protected httpClient: HttpClient;

    /**
     * Base endpoint URL for the API resource.
     */
    protected baseEndpoint: string;

    /**
     * Creates a new instance of BaseApiClient.
     *
     * @param baseEndpoint - The base URL endpoint for the API resource
     * @param httpClient - The HTTP client instance to use for requests
     */
    protected constructor(baseEndpoint: string, httpClient: HttpClient) {
        this.baseEndpoint = baseEndpoint;
        this.httpClient = httpClient;
    }

    /**
     * Builds an OData query string for filtering, sorting, and pagination.
     * This method constructs a query string based on the provided pagination, sorting, and filter parameters.
     *
     * @typeParam TDto - The type of the data transfer object (DTO) being queried
     * @param pagination - Optional pagination state containing pageIndex and pageSize
     * @param sorting - Optional sorting state containing column IDs and sort directions
     * @param prebuiltFilter - Optional prebuilt filter to apply to the query
     * @returns A string representing the OData query
     */
    protected buildODataQuery<TDto>(pagination?: PaginationState, prebuiltSorting?: OrderBy<TDto>, prebuiltFilter?: Filter<TDto>): string {
        return buildQuery<TDto>({
            orderBy: prebuiltSorting,
            filter: prebuiltFilter,
            top: pagination?.pageSize || 10000, // Bring all if not specified
            skip: pagination ? pagination?.pageSize * pagination?.pageIndex : undefined,
        });
    }

    /**
     * Builds query parameters string from an object.
     * Automatically handles arrays, booleans, numbers, and filters out null/undefined values.
     *
     * @param params - Object containing query parameters
     * @returns URLSearchParams instance ready to be converted to string
     * @example
     * ```ts
     * // Simple parameters
     * buildQueryParams({ search: 'test', page: 1, active: true })
     * // Returns URLSearchParams with: "search=test&page=1&active=true"
     *
     * // Array parameters
     * buildQueryParams({ tags: ['red', 'blue'], category: 'electronics' })
     * // Returns URLSearchParams with: "tags=red&tags=blue&category=electronics"
     *
     * // Filtering null/undefined
     * buildQueryParams({ search: 'test', filter: null, sort: undefined })
     * // Returns URLSearchParams with: "search=test"
     * ```
     */
    protected buildQueryParams(params: QueryParams): URLSearchParams {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            // Skip null and undefined values
            if (value === null || value === undefined) {
                return;
            }

            // Handle arrays
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item !== null && item !== undefined) {
                        searchParams.append(key, String(item));
                    }
                });
            } else {
                // Handle primitive types
                searchParams.append(key, String(value));
            }
        });

        return searchParams;
    }

    /**
     * Builds a complete endpoint URL by combining the base endpoint with an optional path and query parameters.
     * Handles proper URL formatting by removing duplicate slashes and ensuring clean concatenation.
     *
     * @param path - Optional path to append to the base endpoint
     * @param queryParams - Optional object containing query parameters
     * @returns The complete, properly formatted endpoint URL
     * @example
     * ```ts
     * // With base endpoint '/api/users'
     * buildEndpoint() // Returns '/api/users'
     * buildEndpoint('/123') // Returns '/api/users/123'
     * buildEndpoint('search') // Returns '/api/users/search'
     * buildEndpoint('search', { q: 'john', active: true }) // Returns '/api/users/search?q=john&active=true'
     * ```
     */
    protected buildEndpoint(path: string = '', queryParams?: QueryParams | string): string {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const cleanBase = this.baseEndpoint.endsWith('/') ? this.baseEndpoint.slice(0, -1) : this.baseEndpoint;
        let endpoint = cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;

        if (queryParams) {
            if (typeof queryParams === 'string') {
                endpoint += queryParams.startsWith('?') ? queryParams : `?${queryParams}`;
                return endpoint;
            }
            const searchParams = this.buildQueryParams(queryParams);
            const queryString = searchParams.toString();
            if (queryString) {
                endpoint += `?${queryString}`;
            }
        }

        return endpoint;
    }

    /**
     * Converts frontend pagination (0-based) to backend pagination (1-based)
     */
    protected buildPagination(pagination?: PaginationState): { page?: number; pageSize?: number } {
        if (!pagination) return {};

        return {
            page: pagination.pageIndex + 1, // Convert 0-based to 1-based
            pageSize: pagination.pageSize,
        };
    }

    /**
     * Retrieves all resources from the API endpoint with optional query parameters.
     * @typeParam T - The type of the queried object
     * @param queryParams - Optional query parameters to filter/sort the results
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to an array of resources
     * @throws When the HTTP request fails
     * @example
     * ```ts
     * const users = await apiClient.getAll<User>();
     * const activeUsers = await apiClient.getAll<User>({ active: true, role: 'admin' });
     * const paginatedUsers = await apiClient.getAll<User>({ page: 1, limit: 10 });
     * ```
     */
    async getAll<T>(queryParams?: QueryParams, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T[]> {
        return this.httpClient.get<T[]>(this.buildEndpoint('', queryParams), options);
    }

    /**
     * Retrieves paginated resources from the API endpoint.
     * @typeParam T - The type of the queried object array
     // * @param queryParams - Optional query parameters to filter/sort the results
     * @param pagination - Pagination state object containing pageIndex and pageSize
     * @param queryParams - Optional query parameters to filter/sort the results
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to a paginated result containing data and pagination metadata
     * @throws When the HTTP request fails
     * @example
     * ```ts
     * const result = await apiClient.getAllPaginated<User[]>({ page: 1, pageSize: 10 });
     * const users = result.data;
     * const totalCount = result.pagination.totalCount;
     * ```
     */
    async getAllPaginated<T>(
        pagination: PaginationState,
        queryParams?: QueryParams,
        options?: Omit<RequestOptions, 'method' | 'data'>,
    ): Promise<PagedResult<T>> {
        return this.httpClient.get<PagedResult<T>>(
            this.buildEndpoint('', {
                ...this.buildPagination(pagination),
                ...queryParams,
            }),
            options,
        );
    }

    // TODO: Add docs
    async getAllOdata<T>(
        pagination?: PaginationState,
        sorting?: OrderBy<T>,
        filters?: Filter<T>,
        pathName: string = '',
        options?: Omit<RequestOptions, 'method' | 'data'>,
    ): Promise<PagedResult<T[]>> {
        return this.httpClient.get<PagedResult<T[]>>(this.buildEndpoint(pathName, this.buildODataQuery(pagination, sorting, filters)), options);
    }

    /**
     * Retrieves a specific resource by its identifier.
     * @typeParam T - The type of the queried object
     * @param id - The unique identifier of the resource (string or number)
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to the requested resource
     * @throws When the resource is not found or the HTTP request fails
     * @example
     * ```ts
     * const user = await apiClient.getById<User>(123);
     * const user = await apiClient.getById<User>('abc-123');
     * ```
     */
    async getById<T>(id: string | number, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
        return this.httpClient.get<T>(this.buildEndpoint(`/${id}`), options);
    }

    /**
     * Creates a new resource in the API.
     *
     * @typeParam T - The type of the created resource object
     * @typeParam TCreate - The type of the data object used to create the resource (defaults to Partial<T>)
     * @param data - The data object containing the properties for the new resource
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to the created resource
     * @throws When validation fails or the HTTP request fails
     * @example
     * ```ts
     * const newUser = await apiClient.create<User>({ name: 'John', email: 'john@example.com' });
     * ```
     */
    async create<T, TCreate = Partial<T>>(data: TCreate, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
        return this.httpClient.post<T>(this.buildEndpoint(), data, options);
    }

    /**
     * Updates an existing resource with new data.
     *
     * @typeParam T - The type of the updated resource object
     * @typeParam TUpdate - The type of the update data object (defaults to Partial<T>)
     * @param id - The unique identifier of the resource to update
     * @param data - The data object containing the properties to update
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to the updated resource
     * @throws When the resource is not found, validation fails, or the HTTP request fails
     * @example
     * ```ts
     * const updatedUser = await apiClient.update<User>(123, { name: 'John Doe' });
     * ```
     */
    async update<T, TUpdate = Partial<T>>(id: string | number, data: TUpdate, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
        return this.httpClient.put<T>(this.buildEndpoint(`/${id}`), data, options);
    }

    /**
     * Deletes a resource from the API.
     *
     * @typeParam T - The type of the response (defaults to void)
     * @param id - The unique identifier of the resource to delete
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to the deletion response (typically void)
     * @throws When the resource is not found or the HTTP request fails
     * @example
     * ```ts
     * await apiClient.delete(123);
     * const response = await apiClient.delete<{ message: string }>(123);
     * ```
     */
    async delete<T = void>(id: string | number, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
        return this.httpClient.delete<T>(this.buildEndpoint(`/${id}`), options);
    }

    /**
     * Restores or activates a previously deleted/deactivated resource.
     * This method uses PATCH to send a request to the resource's activate endpoint.
     *
     * @typeParam T - The type of the response (defaults to void)
     * @param id - The unique identifier of the resource to restore
     * @param options - Optional request configuration (excluding method and data)
     * @returns Promise resolving to the restoration response (typically void)
     * @throws When the resource is not found or the HTTP request fails
     * @example
     * ```ts
     * await apiClient.restore(123);
     * const response = await apiClient.restore<{ message: string }>(123);
     * ```
     */
    async restore<T = void>(id: string | number, options?: Omit<RequestOptions, 'method' | 'data'>): Promise<T> {
        return this.httpClient.patch<T>(this.buildEndpoint(`/${id}/activate`), options);
    }
}
