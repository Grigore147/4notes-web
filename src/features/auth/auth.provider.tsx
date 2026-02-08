export const AUTH_BOOTSTRAP_TTL = 60 * 1000; // 1 minute
export const LAST_AUTH_BOOTSTRAP_KEY = 'auth:last-bootstrap';

export const BROADCAST_CHANNEL = '4notes-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // useAuthBootstrap();

    return <>{children}</>;
}
