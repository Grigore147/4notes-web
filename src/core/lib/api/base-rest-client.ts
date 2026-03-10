import type { AxiosRequestConfig } from 'axios';
import HttpClient from '../http-client';
import type { IQueryFilters } from './query-filters';

export abstract class BaseRestClient<Entity = unknown, Collection = unknown> {
    protected resourceName: string = '';
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public async find(query?: IQueryFilters, options?: AxiosRequestConfig): Promise<Collection> {
        return this.httpClient.get<Collection>(`${this.resourceName}/`, query, options);
    }

    public async findOneById(id: string, query?: IQueryFilters, options?: AxiosRequestConfig): Promise<Entity> {
        return this.httpClient.get<Entity>(`${this.resourceName}/${id}`, query, options);
    }

    public async create(data: unknown, query?: IQueryFilters, options?: AxiosRequestConfig): Promise<Entity> {
        return this.httpClient.post<Entity>(`${this.resourceName}/`, data, query, options);
    }

    public async update(
        id: string,
        data: unknown,
        query?: IQueryFilters,
        options?: AxiosRequestConfig
    ): Promise<Entity> {
        return this.httpClient.put<Entity>(`${this.resourceName}/${id}`, data, query, options);
    }

    public async delete(id: string, query?: IQueryFilters, options?: AxiosRequestConfig): Promise<Entity> {
        return this.httpClient.delete<Entity>(`${this.resourceName}/${id}`, query, options);
    }
}
