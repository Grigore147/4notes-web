import { HttpStatusCode } from 'axios';

export interface ApiResponse<T = unknown> {
    status: 'success' | 'error';
    code: number;
    message: string;
    meta: Meta;
    data: T;
}

export interface ApiErrorResponse {
    status: 'error';
    code: number;
    message: string;
    meta: Meta;
    errors?: Record<string, string[]>;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginatedMeta;
}

export type Meta = {
    requestId: string;
    correlationId: string;
    type: string;
};

export type Pagination = {
    from: number;
    to: number;
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
};

export type PaginatedMeta = Meta & {
    pagination: Pagination;
};

export abstract class Resource<T> implements ApiResponse<T> {
    status: 'success' | 'error' = 'success';
    code: number = 200;
    message: string = '';
    meta: Meta;
    data: T;

    constructor(partial: Partial<Resource<T>>) {
        Object.assign(this, partial);
    }

    // eslint-disable-next-line no-unused-vars
    static created<T, R extends Resource<T>>(this: new (...args: unknown[]) => R, ...args: unknown[]): R {
        const resource = new this(...args);

        resource.code = HttpStatusCode.Created;

        return resource;
    }
}

export class ResourceCollection<T> implements ApiPaginatedResponse<T> {
    status: 'success' | 'error';
    code: number;
    message: string;
    meta: PaginatedMeta;
    data: T[];

    constructor(partial: Partial<ResourceCollection<T>>) {
        Object.assign(this, partial);
    }
}
