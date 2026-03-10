const env = import.meta.env;

const AUTH_APP_URL = env.VITE_AUTH_APP_URL ?? 'https://auth.4notes.app';

export const config = Object.freeze({
    app: {
        name: '4notes-web',
        version: '1.0',
        env: env.MODE
    },

    services: {
        auth: {
            appUrl: AUTH_APP_URL,
            apiUrl: env.VITE_AUTH_API_URL ?? `${AUTH_APP_URL}/api`,

            loginUrl: env.VITE_AUTH_LOGIN_URL ?? `${AUTH_APP_URL}/auth/login`,
            logoutUrl: env.VITE_AUTH_LOGOUT_URL ?? `${AUTH_APP_URL}/api/auth/logout`,
            afterLoginUrl: env.VITE_AUTH_AFTER_LOGIN_URL ?? `${AUTH_APP_URL}`,
            afterLogoutUrl: env.VITE_AUTH_AFTER_LOGOUT_URL ?? `${AUTH_APP_URL}/auth/login`
        },

        notes: {
            appUrl: env.VITE_NOTES_APP_URL ?? 'https://4notes.app',
            apiUrl: env.VITE_NOTES_API_URL ?? 'https://api.4notes.app/api'
        }
    }
} as const);

export type Config = typeof config;
