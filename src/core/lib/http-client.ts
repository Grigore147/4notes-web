import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { type IQueryFilters } from './api/query-filters';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export default class HttpClient {
    public readonly name: string = 'HttpClient';
    public readonly baseUrl: string = '';

    public readonly httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }

    get axios(): AxiosInstance {
        return this.httpClient;
    }

    protected async request<T>(
        method: HttpMethod,
        endpoint: string,
        query?: IQueryFilters,
        options?: AxiosRequestConfig
    ): Promise<T> {
        let config: AxiosRequestConfig = {
            method: method,
            url: `${endpoint}`
        };

        if (query) {
            config.params = this.buildQueryParams(query);
        }
        if (options) {
            config = {
                ...config,
                ...options
            };
        }

        const response = await this.httpClient.request(config);

        return response as T;
    }

    public async get<T>(endpoint: string, query?: IQueryFilters, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('GET', endpoint, query, options);
    }

    public async post<T>(
        endpoint: string,
        data?: unknown,
        query?: IQueryFilters,
        options?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('POST', endpoint, query, {
            ...options,
            data
        });
    }

    public async put<T>(
        endpoint: string,
        data?: unknown,
        query?: IQueryFilters,
        options?: AxiosRequestConfig
    ): Promise<T> {
        return this.request<T>('PUT', endpoint, query, {
            ...options,
            data
        });
    }

    public async delete<T>(endpoint: string, query?: IQueryFilters, options?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('DELETE', endpoint, query, options);
    }

    public buildQueryParams(options: IQueryFilters): URLSearchParams {
        const params = new URLSearchParams();
        const reservedKeys = ['page', 'limit', 'offset', 'sort', 'include', 'search', 'authToken'];

        if (options.page !== undefined) params.append('page', options.page.toString());
        if (options.limit !== undefined) params.append('limit', options.limit.toString());
        if (options.offset !== undefined) params.append('offset', options.offset.toString());
        if (options.sort !== undefined) {
            Object.entries(options.sort).forEach(([key, value]) => {
                params.append(`sort[${key}]`, value);
            });
        }
        if (options.include !== undefined) params.append('include', options.include.join(','));
        if (options.search !== undefined) params.append('search', options.search);

        Object.entries(options).forEach(([key, value]) => {
            if (!reservedKeys.includes(key)) {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(`${key}[]`, v as string));
                } else if (value !== undefined) {
                    params.append(key, value as string);
                }
            }
        });

        return params;
    }
}
