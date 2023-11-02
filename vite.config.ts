/// <reference types="vitest" />
import { resolve } from 'path';
import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig: UserConfig = {
    plugins: [
      react(),
      svgr(),
      dts({
        insertTypesEntry: true,
      }),
      basicSsl(),
    ],
    resolve: {
      alias: {
        types: resolve(__dirname, './src/types'),
        components: resolve(__dirname, './src/components'),
        assets: resolve(__dirname, './src/assets'),
        utils: resolve(__dirname, './src/utils'),
        contexts: resolve(__dirname, './src/contexts'),
        apis: resolve(__dirname, './src/apis'),
        hooks: resolve(__dirname, './src/hooks'),
        constants: resolve(__dirname, './src/constants'),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTest.ts',
    },
  };

  if (mode === 'preview') {
    return {
      ...baseConfig,
      plugins: [
        react(),
        svgr(),
        dts({
          insertTypesEntry: true,
        }),
      ],
    };
  }

  if (mode === 'production') {
    return {
      ...baseConfig,
      plugins: [
        react(),
        svgr(),
        dts({
          insertTypesEntry: true,
        }),
      ],
      build: {
        target: 'ES2015',
        lib: {
          entry: resolve(__dirname, 'src/builder.tsx'),
          name: 'ViteUI',
          formats: ['es', 'umd'],
          fileName: (format) => `vite-ui.${format}.js`,
        },
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    };
  }

  return baseConfig;
});
