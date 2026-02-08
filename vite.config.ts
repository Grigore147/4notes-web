import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [devtools(), viteReact(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    },
    server: {
        allowedHosts: ['app.4notes.app'],
        host: '0.0.0.0',
        port: 8081
    }
});
