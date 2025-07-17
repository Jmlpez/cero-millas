export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
    method?: HttpMethod;
    data?: unknown;
    headers?: HeadersInit;
    params?: Record<string, string>;
    signal?: AbortSignal;
};

export interface ErrorDetails {
    code: number;
    type: ErrorType;
    description: string;
}

export interface ApiErrorData {
    title: string;
    status: ResponseErrorStatus;
    errors?: Record<string, string[]>;
    detail?: string;
}

export enum ResponseErrorStatus {
    Unknown = 0,
    Validation = 400,
    Unauthorized = 401,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
}

export enum ErrorType {
    Failure = 0,
    Unexpected = 1,
    Validation = 2,
    Conflict = 3,
    NotFound = 4,
    Unauthorized = 5,
    Forbidden = 6,
}

export class ApiError extends Error {
    public readonly status: ResponseErrorStatus;
    public readonly errors?: Record<string, string[]>;
    public readonly detail?: string;

    constructor(data: ApiErrorData) {
        super(data.title);
        this.name = 'ApiError';
        this.status = data.status;
        this.errors = data.errors;
        this.detail = data.detail;

        // Keep the stacktrace correct
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }

    // Utils methods
    isValidationError(): boolean {
        return this.status === ResponseErrorStatus.Validation;
    }

    isUnauthorizedError(): boolean {
        return this.status === ResponseErrorStatus.Unauthorized;
    }

    isNotFoundError(): boolean {
        return this.status === ResponseErrorStatus.NotFound;
    }

    // Method to get specific fields errors
    getFieldErrors<T extends Record<string, unknown>>(fieldName: keyof T): string[] {
        return this.errors?.[fieldName as string] || [];
    }

    getErrors(): Record<string, string[]> | undefined {
        return this.errors;
    }

    // Method to serialize (useful for logging)
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            errors: this.errors,
            detail: this.detail,
        };
    }
}
