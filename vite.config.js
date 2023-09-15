// vite.config.js
export default {
    build: {
      target: 'node18',
      outDir: 'dist',
      rollupOptions: {
        input: './src/main.ts',
        external: ['fs', 'path', 'child_process'],
      },
    },
  };
  