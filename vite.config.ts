import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import { setupVitePlugins } from './build/plugins/index';
import { createViteProxy, getBuildTime } from './build/config';
import { include } from './build/optimize';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;
  const buildTime = getBuildTime();
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: { include },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: setupVitePlugins(viteEnv),
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*']
      },
      proxy: createViteProxy(viteEnv, configEnv.command === 'serve'),
      fs: {
        cachedChecks: false
      }
    },
    preview: {
      port: 9725
    }
  };
});
