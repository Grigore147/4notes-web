import { initAuthSession } from '@/features/auth/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import type React from 'react';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user) {
            initAuthSession();
        }
    }, [user]);

    return <>{children}</>;
}
