import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { renderPage } from './src/renderer.js';

function staticBlogDevPlugin() {
  return {
    name: 'vite-plugin-static-blog-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        let url = req.url.split('?')[0];
        
        // Skip Vite internal requests and assets
        if (
          url.startsWith('/@') ||
          url.startsWith('/src/') ||
          url.startsWith('/node_modules/') ||
          url.startsWith('/assets/') ||
          url.endsWith('.js') ||
          url.endsWith('.css') ||
          url.endsWith('.svg') ||
          url.endsWith('.ico') ||
          url.endsWith('.png') ||
          url.endsWith('.jpg')
        ) {
          return next();
        }

        if (url !== '/' && !url.endsWith('/') && !url.includes('.')) {
          url += '/';
        }

        try {
          const html = renderPage(url, { isProd: false });
          if (html) {
            const transformed = await server.transformIndexHtml(url, html);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(transformed);
          }
        } catch (e) {
          console.error('Error rendering page:', e);
        }

        next();
      });
    },
  };
}

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  plugins: [
    tailwindcss(),
    staticBlogDevPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: '/src/main.js',
        style: '/src/style.css',
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
