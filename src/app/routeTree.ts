import { publicRoute } from '@/app/routes/public.routes';
import { rootRoute } from '@/app/routes/root.route';
import { protectedRoute } from './routes/protected.routes';
import { demoRoute } from './routes/protected/demo.routes';
import { homeRoute } from './routes/protected/home.routes';
import { noteRoute } from './routes/protected/notes.routes';
import { loginRoute } from './routes/public/login.route';

export const routeTree = rootRoute.addChildren([
    publicRoute.addChildren([loginRoute]),
    protectedRoute.addChildren([homeRoute, noteRoute, demoRoute])
]);
