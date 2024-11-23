import react from '@vitejs/plugin-react';
import type { PluginOption } from 'vite';
import Inspect from 'vite-plugin-inspect';
import removeConsole from 'vite-plugin-remove-console';

import { setupAutoImport } from './auto-import';
import { setupHtmlPlugin } from './html';
import { setupProjectInfo } from './info';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnPluginIcon } from './unplugin-icon';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    react(),
    setupAutoImport(viteEnv),
    setupUnocss(viteEnv),
    ...setupUnPluginIcon(viteEnv),
    setupElegantRouter(),
    Inspect(),
    removeConsole(),
    setupHtmlPlugin(buildTime),
    setupProjectInfo()
  ];
  return plugins;
}
