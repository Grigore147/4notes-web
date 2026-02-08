import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    accessToken: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type User = z.infer<typeof UserSchema>;

export type AuthEvent =
    | { type: 'UserLoggedIn'; user: User; accessToken: string }
    | { type: 'UserLoggedOut' }
    | { type: 'AccessTokenCreated'; accessToken: string }
    | { type: 'AuthStateRequest'; from: string }
    | { type: 'AuthStateResponse'; to: string; user: User; accessToken: string };

export interface ApiResponse<T> {
    data: T;
}

export interface TokenResponse {
    token: string;
}
