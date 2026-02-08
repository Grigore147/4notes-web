import { NotesPage } from '@/app/pages/NotesPage';
import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from '../protected.routes';

export const noteRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: '/notes',
    component: NotesPage
});
