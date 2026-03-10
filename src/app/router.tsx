import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree';
import type { RouterContext } from './router.context';

export const router = createRouter({
    routeTree,
    context: {
        queryClient: undefined!
    } as RouterContext,
    defaultPreload: 'intent'
});
