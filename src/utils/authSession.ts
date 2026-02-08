/**
 * TODO:
 * - Refactor this to something more universal and based on best practices.
 */

const setSession = (accessToken: string, refreshToken?: string) => {
    if (accessToken) {
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }

        localStorage.setItem('accessToken', accessToken);
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

const clearSession = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export { clearSession, setSession };
