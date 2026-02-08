import { queryOptions } from '@tanstack/react-query';
import { getNotes } from './notes.api';

export const getNotesQuery = queryOptions({
    queryKey: ['notes', 'notes'],
    queryFn: getNotes,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
});
