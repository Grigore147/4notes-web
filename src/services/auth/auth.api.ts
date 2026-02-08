import { AUTH_SERVICE_URL } from '@/app/config';
import { createApiClient } from '@/lib/http/apiClient';
import type { AxiosInstance } from 'axios';
import type { ApiResponse, TokenResponse, User } from './auth.types';

export const api: AxiosInstance = createApiClient(AUTH_SERVICE_URL);

export const initCsrf = async (): Promise<void> => {
    await api.get('/api/csrf-cookie');
};

export const createAccessToken = async (): Promise<string> => {
    const response = await api.post<ApiResponse<TokenResponse>>('/api/tokens');

    return response.data.data.token;
};

export const getUserProfile = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/api/users/profile');

    return response.data.data;
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};
