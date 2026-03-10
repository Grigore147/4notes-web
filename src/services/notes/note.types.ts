import { QueryFilters } from '@/core/lib/api/query-filters';

export interface Note {
    id: string;
    userId: string;
    notebookId: string;
    // notebook: Notebook;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export class NotesQueryFilters extends QueryFilters {
    id?: string | string[];
    notebookId?: string | string[];
    userId?: string | string[];
}

export class CreateNoteInput {
    notebookId: string;
    title: string;
    content?: string = '';
}

export class UpdateNoteInput {
    notebookId?: string;
    title?: string;
    content?: string;
}
