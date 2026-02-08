import { router } from '@/app/router';
import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '../../stores/auth.store';

import * as authApi from '@/services/auth/auth.api';

export async function bootstrapAuth() {
    const store = useAuthStore.getState();

    try {
        const authAccessToken = localStorage.getItem('auth_access_token');
        const authUser = localStorage.getItem('auth_user');

        if (authAccessToken) {
            store.setSession(JSON.parse(authUser!), authAccessToken);
        } else {
            await authApi.initCsrf();

            const accessToken = await authApi.createAccessToken();
            const user = await authApi.getUserProfile();

            store.setSession(user, accessToken);

            localStorage.setItem('auth_access_token', accessToken);
            localStorage.setItem('auth_user', JSON.stringify(user));
        }
    } catch {
        store.clearSession();
    } finally {
        store.markIsInitialized();
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'auth_user') {
            if (event.newValue) {
                const authAccessToken = localStorage.getItem('auth_access_token');
                const authUser = localStorage.getItem('auth_user');

                store.setSession(JSON.parse(authUser!), authAccessToken!);
            } else {
                store.clearSession();
                queryClient.clear();

                router.navigate({ to: '/auth/login', replace: true });
            }
        }
    });
}
