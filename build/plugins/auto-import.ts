import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
export function setupAutoImport(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');
  return AutoImport({
    imports: ['react', 'react-router-dom', 'react-i18next', 'ahooks', { from: 'react', imports: ['FC'], type: true }],
    include: [/\.[tj]sx?$/],
    dirs: ['src/hooks/**'],
    dts: 'src/types/auto-imports.d.ts',
    resolvers: [
      IconsResolver({
        prefix: VITE_ICON_PREFIX,
        extension: 'jsx',
        customCollections: [collectionName],
        componentPrefix: VITE_ICON_PREFIX
      })
    ]
  });
}
