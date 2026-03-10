export interface ApiErrorMeta {
    requestId?: string;
    correlationId?: string;
}

export type ApiErrorResponse = {
    status: string;
    code: number;
    message: string;
    meta: ApiErrorMeta;
    errors?: Record<string, string[]>;
};

export class ApiError extends Error implements ApiErrorResponse {
    public status: string;
    public code: number;
    public message: string;
    public meta: ApiErrorMeta;
    public errors?: Record<string, string[]>;

    constructor(status: string, code: number, message: string, meta: ApiErrorMeta, errors?: Record<string, string[]>) {
        super(message);

        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.message = message;
        this.meta = meta;
        this.errors = errors;
    }
}
