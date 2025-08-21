import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'], // make sure your path matches
    },
})