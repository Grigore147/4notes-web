import { LoginPage } from '@/app/pages/LoginPage';
import { createRoute } from '@tanstack/react-router';
import { publicRoute } from '../public.routes';

export const loginRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: '/auth/login',
    component: LoginPage
});
