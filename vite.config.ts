import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// Derive a robust base URL for different deployment targets.
// Priority:
// 1) Explicit VITE_BASE env (e.g., "/my-base/" or "my-base")
// 2) GitHub Pages CI: "/<repo>/" (detected via GITHUB_REPOSITORY)
// 3) Default: "/"
const sanitizeBase = (base?: string) => {
  if (!base) return '/';
  const b = base.startsWith('/') ? base : `/${base}`;
  return b.endsWith('/') ? b : `${b}/`;
};

const computeBase = () => {
  // In dev, always root
  if (process.env.NODE_ENV !== 'production') return '/';

  // Respect explicit override
  if (process.env.VITE_BASE) return sanitizeBase(process.env.VITE_BASE);

  // GitHub Pages detection
  const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
  const isPages = !!repo && (
    process.env.DEPLOY_TARGET === 'gh-pages' ||
    process.env.GITHUB_PAGES === 'true' ||
    process.env.CI === 'true' ||
    !!process.env.GITHUB_ACTIONS
  );
  if (isPages && repo) return `/${repo}/`;

  return '/';
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
    sparkPlugin() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  base: computeBase(),
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-slider'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@phosphor-icons/react']
  }
});
