import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
    },
    react(),
    // Compression for production builds
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle size visualization (only in analyze mode)
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin,
  ],
  base: '/', // GitHub Pages base URL for user site
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/lib': path.resolve(__dirname, './src/lib'),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Enable minification (using default minifier)
    minify: true,
    // Source maps for production debugging
    sourcemap: false,
    rollupOptions: {
      output: {
        // Optimize asset handling
        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1] || ''

          // Images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]'
          }

          // CSS
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]'
          }

          // Default
          return 'assets/[name]-[hash][extname]'
        },
        // Manual chunk splitting for better caching
        manualChunks: id => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React and related libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            // Router
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            // Animation library
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            // MDX and markdown processing
            if (
              id.includes('@mdx-js') ||
              id.includes('remark') ||
              id.includes('rehype') ||
              id.includes('gray-matter')
            ) {
              return 'vendor-mdx'
            }
            // Other vendors
            return 'vendor'
          }
        },
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
