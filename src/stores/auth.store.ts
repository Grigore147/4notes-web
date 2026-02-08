import type { User } from '@/services/auth/auth.types';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    accessToken?: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
}

interface AuthActions {
    // eslint-disable-next-line no-unused-vars
    setSession: (user: User, accessToken: string) => void;
    clearSession: () => void;
    // eslint-disable-next-line no-unused-vars
    setUser: (user: User) => void;
    // eslint-disable-next-line no-unused-vars
    setAccessToken: (accessToken: string) => void;
    markIsInitialized: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isInitialized: false,

    setSession: function (user: User, accessToken: string) {
        set({
            user,
            isAuthenticated: true,
            accessToken,
            isInitialized: true
        });
    },

    clearSession: function () {
        set({
            user: null,
            isAuthenticated: false,
            accessToken: null
        });
    },

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
            isInitialized: true
        }),

    setAccessToken: function (accessToken) {
        set({ accessToken });
    },

    markIsInitialized: () => set({ isInitialized: true })
}));

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectAccessToken = (state: AuthState) => state.accessToken;

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const setAccessToken = useAuthStore.getState().setAccessToken;
