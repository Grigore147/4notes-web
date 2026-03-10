import { config } from '@/app/config';
import { router } from '@/app/router';
import { authApi as api } from '@/core/api/clients';
import type { ApiResponse } from '@/core/lib/api/api-response';
import type { AuthTokenResponse, User } from '@/features/auth/auth.types';
import { useAuthStore } from '@/stores/auth.store';

export const initAuthSession = async (redirect = true, force = false): Promise<boolean> => {
    const user = useAuthStore.getState().user;
    const setUser = useAuthStore.getState().setUser;
    const setAccessToken = useAuthStore.getState().setAccessToken;

    if (user && !force) {
        return true;
    }

    try {
        setAccessToken(await createAccessToken());
        setUser(await getUserProfile());

        if (redirect) {
            router.navigate({ to: '/' });
        }

        return true;
    } catch (error) {
        console.log('Failed to init auth session!', error);

        return false;
    }
};

export const getCsrfCookie = async () => {
    return api.get(`${config.services.auth.appUrl}/auth/csrf-cookie`);
};

export const createAccessToken = async (): Promise<string> => {
    const response = await api.post<ApiResponse<AuthTokenResponse>>('/tokens');

    return response.data.token;
};

export const getUserProfile = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/profile');

    response.data.avatar = '/avatars/shadcn.jpg';

    return response.data;
};

export const logout = async (redirect = true) => {
    console.log('Calling auth:logout ...');

    try {
        const result = await api.post(`${config.services.auth.appUrl}/auth/logout`);

        console.log(result);
    } catch (error) {
        console.log('Logout request failed!');
        console.log(error);
    }

    useAuthStore.getState().clearSession();

    if (redirect) {
        window.location.href = '/auth/login';
    }
};
