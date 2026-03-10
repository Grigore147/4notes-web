import type HttpClient from '@/core/lib/http-client';
import { NoteResource, NoteResourceCollection } from './note.resource';
import { type CreateNoteInput, type NotesQueryFilters, type UpdateNoteInput } from './note.types';
import { NotesApi } from './notes.api';

export class NotesService {
    protected api: NotesApi;

    constructor(httpClient: HttpClient) {
        this.api = new NotesApi(httpClient);
    }

    async find(query?: NotesQueryFilters): Promise<NoteResourceCollection> {
        const notes = await this.api.find(query);

        return new NoteResourceCollection(notes);
    }

    async findOneById(id: string, query?: NotesQueryFilters): Promise<NoteResource> {
        const note = await this.api.findOneById(id, query);

        return new NoteResource(note);
    }

    async create(data: CreateNoteInput, query?: NotesQueryFilters): Promise<NoteResource> {
        const note = await this.api.create(data, query);

        return new NoteResource(note);
    }

    async update(id: string, data: UpdateNoteInput, query?: NotesQueryFilters): Promise<NoteResource> {
        const note = await this.api.update(id, data, query);

        return new NoteResource(note);
    }

    async delete(id: string, query?: NotesQueryFilters): Promise<NoteResource> {
        const response = await this.api.delete(id, query);

        return new NoteResource(response);
    }
}
