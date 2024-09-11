import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import type { Location, RouteObject } from 'react-router-dom';
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import type { BlockerFunction, RouterState } from '@remix-run/router';
import type { RouteLocationNamedRaw, RouteLocationNormalizedLoaded } from './types';
import CreateRouterMatcher from './matcher';
import { cleanParams, findParentNames, getFullPath, removeElement } from './utils/auxi';
import { START_LOCATION_NORMALIZED } from './location';
import type { NavigationFailure } from './error';
import { ErrorTypes, createRouterError } from './error';
import { warn } from './warning';

const historyCreatorMap = {
  hash: createHashRouter,
  history: createBrowserRouter,
  memory: createMemoryRouter
};

type HistoryCreator = typeof historyCreatorMap;

type Mode = keyof HistoryCreator;

type Options = Parameters<HistoryCreator[Mode]>[1];

export interface RouterOptions {
  mode: Mode;
  initRoutes: ElegantConstRoute[];
  opt: Options;
  getReactRoutes: (route: ElegantConstRoute) => RouteObject;
  init: () => Promise<void>;
  afterEach: any;
  beforeEach: any;
}

export function createRouter({ beforeEach, initRoutes, mode, opt, getReactRoutes, init, afterEach }: RouterOptions) {
  const matcher = new CreateRouterMatcher(initRoutes);

  const initReactRoutes = initRoutes.map(route => getReactRoutes(route));

  const reactRouter = historyCreatorMap[mode](initReactRoutes, opt);

  reactRouter.dispose();

  let currentRoute = START_LOCATION_NORMALIZED;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let listeners: any;

  reactRouter.subscribe(afterRouteChange);

  reactRouter.getBlocker('beforeGuard', onBeforeRouteChange);

  /**
   * Adds React routes to the router.
   *
   * @param routes - An array of elegant constant routes.
   */
  function addReactRoutes(parentOrRoute: ElegantConstRoute[] | string, elegantRoutes?: ElegantConstRoute[]) {
    // Flatten nested routes
    let parent: string | null = null;
    let routes: ElegantConstRoute[];
    if (typeof parentOrRoute === 'string') {
      parent = parentOrRoute;
      if (!elegantRoutes) return;
      routes = elegantRoutes;
    } else {
      routes = parentOrRoute;
    }

    const flattenRoutes = routes.flat();

    const reactRoutes = flattenRoutes.map(route => {
      const match = matcher.getRecordMatcher(route.name);
      if (match) return null;
      // Add route
      addRoute(route);
      // Transform to react-router route
      const reactRoute = getReactRoutes(route);

      return reactRoute;
    });
    if (reactRoutes.length < 1) return;
    // Add to react-router's routes
    reactRouter.patchRoutes(parent, reactRoutes as RouteObject[]);
  }

  function onBeforeRouteChange({ nextLocation }: Parameters<BlockerFunction>[0]) {
    const to = resolve(nextLocation);

    if (to.fullPath === currentRoute.fullPath) {
      return true;
    }

    if (nextLocation.state === 'reload') return false;

    if (to.redirect) {
      if (to.redirect.startsWith('/')) {
        if (to.redirect === currentRoute.fullPath) {
          return true;
        }
      } else {
        const finalRoute = to.matched[to.matched.length - 1];

        const finalPath = getFullPath(finalRoute);

        if (finalPath === currentRoute.fullPath) return true;
      }
    }

    return beforeEach(to, currentRoute, next);
  }

  function next(param?: boolean | string | Location | RouteLocationNamedRaw) {
    if (!param) return false;
    if (typeof param === 'string') {
      reactRouter.navigate(param);
    }

    if (typeof param === 'object') {
      const finalRedirectPath = resolve(param);
      reactRouter.navigate(finalRedirectPath.fullPath);
    }

    return true;
  }

  /**
   * Adds a route or updates an existing one.
   *
   * @param parentOrRoute - The parent route or the route to add.
   * @param route - The route to add if parentOrRoute is a string.
   */
  function addRoute(parentOrRoute: string | ElegantConstRoute, route?: ElegantConstRoute) {
    let parent: Parameters<(typeof matcher)['addRoute']>[1] | undefined;
    let record;

    if (typeof parentOrRoute === 'string') {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (import.meta.env.MODE === 'development' && !parent) {
        warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`);
      }
      record = route!;
    } else {
      record = parentOrRoute;
    }

    matcher.addRoute(record, parent);
  }

  function afterRouteChange(state: RouterState) {
    if (state.navigation.state === 'idle') {
      const from = currentRoute;

      currentRoute = resolve(state.location);

      afterEach(currentRoute, from);
    }
  }

  /**
   * Resolves a location into a normalized route.
   *
   * @param rawLocation - The raw location to resolve.
   * @param currentLocation - The current location.
   * @returns A normalized loaded route location.
   */
  function resolve(
    rawLocation: Location | RouteLocationNamedRaw,
    currentLocation?: RouteLocationNamedRaw
  ): RouteLocationNormalizedLoaded {
    const current = { ...(currentLocation || (currentRoute as RouteLocationNamedRaw)) };

    let matcherLocation: Location | RouteLocationNamedRaw;

    // path could be relative in object as well

    if ('pathname' in rawLocation) {
      matcherLocation = rawLocation;
    } else {
      // pass encoded values to the matcher, so it can produce encoded path and fullPath

      matcherLocation = Object.assign(rawLocation, {
        params: cleanParams(rawLocation.params),
        query: cleanParams(rawLocation.query)
      });
    }

    const matchedRoute = matcher.resolve(matcherLocation, current);

    return {
      ...matchedRoute,
      redirectedFrom: currentRoute
    };
  }

  function go(delta: number) {
    reactRouter.navigate(delta);
  }

  function back() {
    go(-1);
  }

  function forwardRef() {
    go(1);
  }

  async function initReady(): Promise<boolean> {
    return new Promise((resolved, reject) => {
      init()
        .then(() => {
          reactRouter.initialize();
          resolved(true);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /**
   * Gets all the routes currently in the matchers array.
   *
   * @returns An array of matcher objects.
   */
  function getRoutes() {
    return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
  }

  /**
   * Retrieves a route by its name.
   *
   * @param name - The name of the route.
   * @returns The route record or false if not found.
   */
  function getRouteByName(name: string) {
    return matcher.getRecordMatcher(name)?.record;
  }

  function getAllRouteNames() {
    return matcher.getAllRouteNames();
  }

  function push(to: RouteLocationNamedRaw | string | Location) {
    const resolved = typeof to === 'string' ? { fullPath: to } : resolve(to);

    if (!resolved && typeof to !== 'string') {
      const failure = createRouterError<NavigationFailure>(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: resolved,
        from: currentRoute
      });

      return Promise.reject(failure);
    }

    const target = resolved.fullPath;

    const state = 'state' in resolved ? resolved.state : null;

    if (target !== currentRoute.fullPath) {
      reactRouter.navigate(target, { state });
    }

    return Promise.resolve(true);
  }
  /**
   * Get route meta by key
   *
   * @param key Route key
   */
  function getRouteMetaByKey(key: string) {
    return getRoutes().find(route => route.name === key)?.meta;
  }

  function getSnapshot() {
    return currentRoute;
  }

  function resetRoute() {
    // Resets the route matcher so it can begin matching new routes again.
    matcher.resetMatcher();
  }

  function subscribe(listener: () => void) {
    listeners = [listener];
    return () => {
      listeners = [];
    };
  }

  function removeRoute(name: string) {
    const matched = matcher.getRecordMatcher(name);
    if (!matched) return;
    let routes = reactRouter.routes;
    if (matched.parent) {
      const parentNames = findParentNames(matched.parent);

      parentNames.forEach(parentName => {
        const finalRoute = routes.find(route => route.id === parentName);
        if (finalRoute && finalRoute.children) routes = finalRoute.children;
      });
      removeElement(routes, matched.name);
    } else {
      routes = routes.filter(route => route.id !== matched.record.name);
    }
    reactRouter._internalSetRoutes(routes);
    matcher.removeRoute(name);
  }

  const router = {
    reactRouter,
    go,
    back,
    removeRoute,
    getRouteMetaByKey,
    forwardRef,
    subscribe,
    initReady,
    getRoutes,
    getSnapshot,
    resetRoute,
    addReactRoutes,
    push,
    getAllRouteNames,
    getRouteByName,
    resolve
  };

  return router;
}
