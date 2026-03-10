export interface IQueryFilters {
    page?: number;
    limit?: number;
    offset?: number;
    sort?: Record<string, string>;
    include?: string[];
    search?: string;
    [key: string]: unknown;
}

export class QueryFilters implements IQueryFilters {
    page?: number = 1;
    limit?: number = 25;
    offset?: number;
    sort?: Record<string, string>;
    include?: string[];
    search?: string;
    [key: string]: unknown;
}
