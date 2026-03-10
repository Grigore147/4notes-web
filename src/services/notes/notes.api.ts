import type { ApiPaginatedResponse, ApiResponse } from '@/core/lib/api/api-response';
import { BaseRestClient } from '@/core/lib/api/base-rest-client';
import type HttpClient from '@/core/lib/http-client';
import type { Note } from './note.types';

export type NoteEntityResponse = ApiResponse<Note>;
export type NoteCollectionResponse = ApiPaginatedResponse<Note>;

export class NotesApi extends BaseRestClient<NoteEntityResponse, NoteCollectionResponse> {
    protected resourceName: string = '/notes';

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}
