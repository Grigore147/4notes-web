import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from '../protected.routes';

type Note = {
    id: string;
    title: string;
};

export const demoRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: '/demo',
    loader: async () => {
        // const response = await fetch('https://api.4notes.app/api/notes');
        // return response.json() as Promise<{
        //     results: {
        //         title: string;
        //     }[];
        // }>;

        return new Promise((resolve) =>
            resolve([
                {
                    id: 'id-123',
                    title: 'Demo note'
                }
            ])
        );
    },
    component: () => {
        const notes = demoRoute.useLoaderData();

        return (
            <ul>
                {notes.map((note: Note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        );
    }
});
