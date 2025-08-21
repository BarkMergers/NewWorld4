import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        exclude: [
            ...configDefaults.exclude,
            'playwright-tests/*'
        ],
        environment: 'jsdom', // Required for DOM access
        globals: true, // Optional, for cleaner syntax in tests
        setupFiles: './setupTests.ts' // Optional, for test setup
    }
})