import { getFromLS } from '@/lib/utils';
import { ApiError, ApiErrorData, RequestOptions, ResponseErrorStatus } from '@services/http-client-types';

/**
 * A class to handle HTTP requests to a specified base URL.
 */
export class HttpClient {
    baseUrl: string;
    defaultHeaders: HeadersInit;

    constructor(baseUrl?: string, defaultHeaders?: HeadersInit) {
        // Use provided baseUrl or fallback to environment variable or default value.
        this.baseUrl = baseUrl || '/';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...defaultHeaders,
        };
    }

    /**
     * Transform error field names from PascalCase to camelCase
     */
    private transformErrorFields(errors?: Record<string, string[]>): Record<string, string[]> | undefined {
        if (!errors) return undefined;

        const transformedErrors: Record<string, string[]> = {};

        for (const [key, value] of Object.entries(errors)) {
            // Convert PascalCase to camelCase
            const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
            transformedErrors[camelCaseKey] = value;
        }
        return transformedErrors;
    }

    /**
     * Set an authorization header with a bearer token
     * @param token - JWT token
     */
    setAuthToken(token: string | null): void {
        if (token) {
            this.defaultHeaders = {
                ...this.defaultHeaders,
                Authorization: `Bearer ${token}`,
            };
        } else {
            // Remove Authorization header if token is null
            const headers = { ...this.defaultHeaders } as Record<string, string>;
            delete headers.Authorization;
            this.defaultHeaders = headers;
        }
    }

    /**
     * Request interceptor - automatically adds token from localStorage if not present
     */
    private interceptRequest(headers: HeadersInit): HeadersInit {
        const requestHeaders = { ...this.defaultHeaders, ...headers } as Record<string, string>;
        // Auto-add token from localStorage if not already present
        if (!requestHeaders.Authorization) {
            const token = getFromLS('auth_token');
            if (token) {
                requestHeaders.Authorization = `Bearer ${token}`;
            }
        }

        return requestHeaders;
    }

    /**
     * Properly construct URL by combining baseUrl and endpoint
     */
    private constructUrl(endpoint: string): string {
        // Remove trailing slash from baseUrl and leading slash from endpoint
        const cleanBaseUrl = this.baseUrl.replace(/\/$/, '');
        const cleanEndpoint = endpoint.replace(/^\//, '');

        // Combine with single slash
        return `${cleanBaseUrl}/${cleanEndpoint}`;
    }

    private async request<TResult>(endpoint: string, { method = 'GET', data, headers = {}, signal }: RequestOptions = {}): Promise<TResult> {
        const options: RequestInit = {
            method,
            credentials: 'include',
            headers: this.interceptRequest(headers),
            signal,
        };

        if (data) {
            if (data instanceof FormData) {
                // Don't set Content-Type for FormData to ensure the correct boundary is set
                delete (options.headers as Record<string, string>)['Content-Type'];
                options.body = data;
            } else {
                options.body = JSON.stringify(data);
            }
        }

        try {
            // Properly construct URL ensuring no double slashes and no missing slashes
            const url = this.constructUrl(endpoint);
            const response = await fetch(url, options);

            // For 204 No Content responses
            if (response.status === 204) {
                return {} as TResult;
            }

            // Check for HTTP error statuses
            if (!response.ok) {
                const errorData: ApiErrorData = await response.json().catch(() => null);
                throw new ApiError({
                    title: errorData?.title ?? response.statusText,
                    status: response.status,
                    errors: this.transformErrorFields(errorData?.errors),
                    detail: errorData?.detail ?? undefined,
                });
            }
            const responseData = await response.json();
            return responseData as TResult;
        } catch (error) {
            // Rethrow ApiError or wrap other errors
            if ((error as ApiError).status) {
                throw error;
            } else {
                // Network errors, etc.
                throw new ApiError({
                    title: (error as Error).message || 'Network error occurred',
                    status: ResponseErrorStatus.Unknown,
                    detail: (error as Error).stack,
                });
            }
        }
    }

    async get<TResult>(endpoint: string, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<TResult> {
        return this.request<TResult>(endpoint, { ...options, method: 'GET' });
    }

    async post<TResult>(endpoint: string, data?: unknown, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<TResult> {
        return this.request<TResult>(endpoint, { ...options, method: 'POST', data });
    }

    async put<TResult>(endpoint: string, data?: unknown, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<TResult> {
        return this.request<TResult>(endpoint, { ...options, method: 'PUT', data });
    }

    async patch<TResult>(endpoint: string, data?: unknown, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<TResult> {
        return this.request<TResult>(endpoint, { ...options, method: 'PATCH', data });
    }

    async delete<TResult>(endpoint: string, data?: unknown, options: Omit<RequestOptions, 'method' | 'data'> = {}): Promise<TResult> {
        return this.request<TResult>(endpoint, { ...options, method: 'DELETE', data });
    }
}

// Create a default instance but don't export it directly
// to encourage creating specific instances when needed
const createHttpClient = (baseUrl?: string, defaultHeaders?: HeadersInit) => {
    return new HttpClient(baseUrl, defaultHeaders);
};

export default createHttpClient;
