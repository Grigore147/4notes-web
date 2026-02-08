import { AppProviders } from '@/app/providers';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';
import { bootstrapAuth } from './features/auth/bootstrapAuth';
import './index.css';

async function startApp() {
    await bootstrapAuth();

    document.getElementById('boot-loader')?.remove();

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppProviders />
        </StrictMode>
    );
}

startApp();
