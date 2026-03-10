import { Resource, ResourceCollection } from '@/core/lib/api/api-response';
import type { Note } from './note.types';

export class NoteResource extends Resource<Note> {
    declare data: Note;
}

export class NoteResourceCollection extends ResourceCollection<Note> {
    declare data: Note[];
}
