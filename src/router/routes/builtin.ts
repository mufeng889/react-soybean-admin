import type { CustomRoute } from '@elegant-router/types';
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import { getRoutePath } from '../elegant/transform';

export const ROOT_ROUTE: CustomRoute = {
  name: 'root',
  path: '/',
  redirect: getRoutePath(import.meta.env.VITE_ROUTE_HOME) || '/home',
  meta: {
    title: 'root',
    constant: true
  }
};

const NOT_FOUND_ROUTE: CustomRoute = {
  name: 'not-found',
  path: '*',
  component: '$view.404',
  meta: {
    title: 'not-found',
    constant: true
  }
};

/** builtin routes, it must be constant and setup in vue-router */
export const builtinRoutes: ElegantConstRoute[] = [ROOT_ROUTE, NOT_FOUND_ROUTE];
