import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/nuvora-fakestore/', // Change this to match your GitHub repository name
    plugins: [
        react(),
        tailwindcss(),
        checker({
            typescript: {
                tsconfigPath: './tsconfig.json',
            },
        }),
        tsconfigPaths(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: '0.0.0.0',
        port: process.env.PORT ? parseInt(process.env.PORT) : 5173
    }
});

