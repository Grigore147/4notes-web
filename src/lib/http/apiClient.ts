import { logout } from '@/services/auth/auth.service';
import { getAccessToken, setAccessToken } from '@/stores/auth.store';
import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export function createApiClient(baseURL: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        timeout: 10000,
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: 'AUTH-XSRF-TOKEN',
        xsrfHeaderName: 'X-AUTH-XSRF-TOKEN'
    });

    client.interceptors.request.use((request) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return request;
    });

    client.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
            };
            const isTokenRequest = originalRequest.url?.includes('/api/tokens');

            if (!error.response) {
                return Promise.reject(error);
            }

            if (error.response.status === 401 && !originalRequest._retry && !isTokenRequest) {
                originalRequest._retry = true;

                try {
                    const response = await client.post('/api/tokens');

                    setAccessToken(response.data.data.token);

                    originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;

                    return client(originalRequest);
                } catch (refreshError) {
                    await logout();

                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return client;
}
