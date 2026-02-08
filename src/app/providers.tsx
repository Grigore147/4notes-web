import { AuthProvider } from '@/features/auth/auth.provider';
import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

export function AppProviders() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {/* RouterContext is used ONLY for loaders/actions */}
                <RouterProvider router={router} context={{ queryClient }} />
            </AuthProvider>
        </QueryClientProvider>
    );
}
