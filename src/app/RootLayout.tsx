import { FullScreenLoader } from '@/components/full-screen-loader';
import { useAuthStore } from '@/stores/auth.store';
import { Outlet } from '@tanstack/react-router';

export function RootLayout() {
    const isInitialized = useAuthStore((state) => state.isInitialized);

    if (!isInitialized) return <FullScreenLoader />;

    return <Outlet />;
}
