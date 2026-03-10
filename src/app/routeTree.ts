import { publicRoute } from '@/app/routes/public.routes';
import { rootRoute } from '@/app/routes/root.route';
import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from './routes/protected.routes';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotesPage from '@/pages/NotesPage';

export const routeTree = rootRoute.addChildren([
    publicRoute.addChildren([
        createRoute({
            getParentRoute: () => publicRoute,
            path: '/auth/login',
            component: LoginPage
        })
    ]),
    protectedRoute.addChildren([
        createRoute({
            getParentRoute: () => protectedRoute,
            path: '/',
            // component: lazyRouteComponent(() => import('@/app/pages/HomePage'))
            component: HomePage
        }),
        createRoute({
            getParentRoute: () => protectedRoute,
            path: '/notes',
            component: NotesPage
        }),
        createRoute({
            getParentRoute: () => protectedRoute,
            path: '/demo',
            component: HomePage
        })
    ])
]);
