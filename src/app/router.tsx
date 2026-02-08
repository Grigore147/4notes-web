import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';

export const router = createRouter({
    routeTree,
    context: {
        queryClient: undefined!
    },
    defaultPreload: 'intent'
});
