import type { User } from '@/features/auth/auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: User | null;
    accessToken: string | null;
}

interface AuthActions {
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    setSession: (user: User | null, accessToken: string | null) => void;
    clearSession: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user) => set({ user }),
            setAccessToken: (accessToken) => set({ accessToken }),
            setSession: (user, accessToken) => set({ user, accessToken }),
            clearSession: () => {
                set({ user: null, accessToken: null });
            }
        }),
        {
            name: 'auth-state',
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user
            })
        }
    )
);
