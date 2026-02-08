import { useAuthStore } from '@/stores/auth.store';
import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root.route';

export const protectedRoute = createRoute({
    id: 'protected',
    getParentRoute: () => rootRoute,
    beforeLoad: async () => {
        const { isAuthenticated } = useAuthStore.getState();

        if (!isAuthenticated) {
            throw redirect({ to: '/auth/login' });
        }
    }
});
