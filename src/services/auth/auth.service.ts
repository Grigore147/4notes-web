import { router } from '@/app/router';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/stores/auth.store';

import * as authApi from '@/services/auth/auth.api';

export async function logout(): Promise<void> {
    try {
        await authApi.logout();
    } finally {
        useAuthStore.getState().clearSession();

        queryClient.clear();

        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_access_token');

        router.navigate({ to: '/auth/login' });
    }
}
