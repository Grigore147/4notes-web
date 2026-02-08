import { rootRoute } from '@/app/routes/root.route';
import { createRoute } from '@tanstack/react-router';

export const publicRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'public'
});
