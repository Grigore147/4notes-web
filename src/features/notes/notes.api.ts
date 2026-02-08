import { authFetch } from '../auth/authFetch';

const NOTES_API = 'https://api.4notes.app';

export async function getNotes() {
    const response = await authFetch(`${NOTES_API}/api/notes`);

    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }

    return response.json();
}
