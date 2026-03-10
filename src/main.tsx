import { AppProviders } from '@/app/providers';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';
import './index.css';

async function startApp() {
    document.getElementById('boot-loader')?.remove();

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppProviders />
        </StrictMode>
    );
}

startApp();
