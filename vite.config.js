// // vite.config.js
// export default {
//     build: {
//       target: 'node18',
//       outDir: 'dist',
//       rollupOptions: {
//         input: './src/main.ts',
//         external: ['fs', 'path', 'child_process', 'inquirer','node:async_hooks'],
//         output: {
//           entryFileNames: '[name].js', // Set the name of the output file
//           format: 'cjs', // CommonJS format for Node.js compatibility
//         },

//       },
//       optimizeDeps: {
//         exclude: ['@inquirer/core'], // Exclude problematic dependencies
//       },
//     },
//   };
// vite.config.ts
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: 'node', // Specify Node.js adapter
      appPath: './src/main.ts' // Main entry point of the CLI
    })
  ],
  build: {
    outDir: 'dist',
    target: 'node18',
    rollupOptions: {
      external: ['inquirer', 'node:async_hooks'], // Exclude Node.js-specific modules
      output: {
        entryFileNames: '[name].mjs',
        format: 'es' // Use CommonJS format for Node.js compatibility
      }
    }
  }
});
