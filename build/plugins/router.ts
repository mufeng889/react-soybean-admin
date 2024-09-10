import ElegantReactRouter from '@ohh-889/react-auto-route/vite';
import type { RouteKey } from '@elegant-router/types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RouteMeta extends Record<string | number, unknown> {}

export function setupElegantRouter() {
  return ElegantReactRouter({
    layouts: {
      base: 'src/layouts/base-layout/index.tsx',
      blank: 'src/layouts/blank-layout/index.tsx'
    },
    log: false,
    customRoutes: {
      names: [
        'exception_403',
        'exception_404',
        'exception_500',
        'document_project',
        'document_project-link',
        'document_react',
        'document_vite',
        'document_unocss',
        'document_proComponents',
        'document_antd',
        'logout'
      ]
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['login', '403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as App.I18n.I18nKey
      };

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    }
  });
}
