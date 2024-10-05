import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import { createRouter } from '@sa/simple-router';
import { layouts, pages } from './elegant/imports';
import { transformElegantRouteToReactRoute } from './elegant/transform';
import { afterEach, createRouteGuard, init } from './guard';
import { builtinRoutes } from './routes/builtin';

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env;

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
function getReactRoutes(route: ElegantConstRoute) {
  return transformElegantRouteToReactRoute(route, layouts, pages);
}

export const router = createRouter({
  initRoutes: builtinRoutes,
  mode: VITE_ROUTER_HISTORY_MODE,
  getReactRoutes,
  init,
  opt: { basename: VITE_BASE_URL }
});

export async function setupRouter() {
  router.beforeEach(createRouteGuard);
  router.afterEach(afterEach);
  await router.initReady();
}
