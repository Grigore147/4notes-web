import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { config } from '@/app/config';
import { createAccessToken, getCsrfCookie, logout } from '@/features/auth/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import HttpClient from '../lib/http-client';

const DEFAULT_OPTIONS = {
    timeout: 10000,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'AUTH-XSRF-TOKEN',
    xsrfHeaderName: 'X-AUTH-XSRF-TOKEN',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

export const authApi = new HttpClient(
    axios.create({
        ...DEFAULT_OPTIONS,
        baseURL: config.services.auth.apiUrl
    })
);

export const notesApi = new HttpClient(
    axios.create({
        ...DEFAULT_OPTIONS,
        baseURL: config.services.notes.apiUrl
    })
);

attachAccessTokenInterceptor(authApi);
attachRefreshTokenInterceptor(authApi);
attachAccessTokenInterceptor(notesApi);
attachRefreshTokenInterceptor(notesApi);

export function attachAccessTokenInterceptor(httpClient: HttpClient) {
    httpClient.axios.interceptors.request.use((config) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        config.headers.set('X-Request-ID', crypto.randomUUID());

        return config;
    });
}

let refreshPromise: Promise<string> | null = null;

export function attachRefreshTokenInterceptor(httpClient: HttpClient) {
    httpClient.axios.interceptors.response.use(
        (response) => response.data,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
            };

            if (error.response?.status === 419) {
                await getCsrfCookie();

                return httpClient.axios(originalRequest);
            }

            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = createAccessToken();
            }

            try {
                const accessToken = await refreshPromise;

                refreshPromise = null;
                useAuthStore.getState().setAccessToken(accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return httpClient.axios(originalRequest);
            } catch (error) {
                refreshPromise = null;

                console.log(error);

                await logout();
            }
        }
    );
}
