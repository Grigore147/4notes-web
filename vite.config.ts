import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
    const env = process.env;

    Object.assign(env, loadEnv(mode, process.cwd()));

    const SERVER_ALLOWED_HOSTS = env.VITE_SERVER_ALLOWED_HOSTS
        ? env.VITE_SERVER_ALLOWED_HOSTS.split(',')
        : ['app.4notes.local'];
    const SERVER_HOST = env.VITE_SERVER_HOST || '127.0.0.1';
    const SERVER_PORT = env.VITE_SERVER_PORT ? parseInt(env.VITE_SERVER_PORT) : 8081;
    const OUTPUT_DIR = env.VITE_OUTPUT_DIR || 'dist';

    return defineConfig({
        plugins: [devtools(), viteReact(), tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        build: {
            outDir: OUTPUT_DIR,
            emptyOutDir: true
        },
        server: {
            allowedHosts: SERVER_ALLOWED_HOSTS,
            host: SERVER_HOST,
            port: SERVER_PORT
        }
    });
};
