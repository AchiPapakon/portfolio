/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            https: {
                key: env.VITE_LOCALHOST_KEY?.replace(/\\n/g, '\n'),
                cert: env.VITE_LOCALHOST_CERT?.replace(/\\n/g, '\n'),
            },
        },
        test: {
            globals: true,
        },
    };
});
