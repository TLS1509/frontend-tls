import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configuration Vite SANS plugin React pour éviter l'erreur d'incompatibilité
// @vitejs/plugin-react@6.0.1 essaie d'importer 'vite/internal' qui n'existe pas
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    jsxInject: `import React from 'react'`,
    loader: 'tsx',
    include: /\.(tsx?|jsx?)$/,
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    esbuildOptions: {
      jsx: 'automatic',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
      },
    },
  },
})
