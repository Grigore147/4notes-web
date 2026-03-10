import type { Entity } from '@/core/types';

export interface AuthTokenResponse {
    token: string;
    expiresAt: string;
}

export type User = Entity<{
    name: string;
    email: string;
    avatar: string;
    accessToken?: string;
}>;
