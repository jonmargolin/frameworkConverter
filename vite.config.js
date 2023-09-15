// vite.config.js
export default {
  build: {
    // Ensure that your Node.js version is compatible with 'node18'
    target: 'node18',
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.ts',
    
      external: ['fs', 'path', 'child_process', 'events', 'process'],
    },
  },
};
