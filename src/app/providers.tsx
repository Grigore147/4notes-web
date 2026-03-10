import { queryClient } from '@/app/query-client';
import AuthProvider from '@/features/auth/auth.provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

export function AppProviders() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} context={queryClient} />
            </AuthProvider>
        </QueryClientProvider>
    );
}
