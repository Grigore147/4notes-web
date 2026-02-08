import { HomePage } from '@/app/pages/HomePage';
import { createRoute } from '@tanstack/react-router';
import { protectedRoute } from '../protected.routes';

export const homeRoute = createRoute({
    getParentRoute: () => protectedRoute,
    path: '/',
    // component: lazyRouteComponent(() => import('@/app/pages/HomePage'))
    component: HomePage
});
