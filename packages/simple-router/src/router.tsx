import type { Location, RouteObject } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import type { BlockerFunction, Router as RemixRouter, RouterState } from '@remix-run/router';
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import React from 'react';
import type { RouteLocationNamedRaw, RouteLocationNormalizedLoaded, RouterOptions } from './types';
import CreateRouterMatcher from './matcher';
import type { RouteRecordNormalized } from './matcher/types';
import { START_LOCATION_NORMALIZED } from './types';
import { RouterContext } from './hooks/useRouter';
import { RouteContext } from './hooks/useRoute';
import { warn } from './warning';

const historyCreatorMap: Record<
  'hash' | 'history' | 'memory',
  (
    routes: RouteObject[],
    opts?: {
      basename?: string;
    }
  ) => RemixRouter
> = {
  hash: createHashRouter,
  history: createBrowserRouter,
  memory: createMemoryRouter
};

class CreateRouter {
  // Internal routes maintained for react-router
  reactRoutes: RouteObject[] = [];
  initRoute = false;
  reactRouter: RemixRouter;
  initReactRoutes: RouteObject[] = [];
  matcher: CreateRouterMatcher;
  currentRoute = START_LOCATION_NORMALIZED;
  getReactRoutes: (route: ElegantConstRoute) => RouteObject;

  constructor({
    initRoutes,
    history,
    basename,
    getReactRoutes,
    init,
    beforeEach,
    afterEach,
    firstInit
  }: RouterOptions) {
    this.matcher = new CreateRouterMatcher(initRoutes);

    const initReactRoutes = initRoutes.map(route => {
      return getReactRoutes(route);
    });
    this.reactRouter = historyCreatorMap[history](initReactRoutes, {
      basename
    });

    this.reactRouter.getBlocker('beforeGuard', (arg: Parameters<BlockerFunction>[0]) =>
      this.#onBeforeRouteChange(arg, beforeEach, firstInit)
    );

    this.reactRouter.subscribe((state: RouterState) => this.#afterRouteChange(state, afterEach));
    this.initReactRoutes = initReactRoutes;
    this.getReactRoutes = getReactRoutes;
    Promise.resolve().then(async () => {
      await init(this.reactRouter);
      this.reactRouter.navigate(this.reactRouter.state.location, { replace: true });
    });
  }

  /**
   * Adds React routes to the router.
   *
   * @param routes - An array of elegant constant routes.
   */
  addReactRoutes(routes: ElegantConstRoute[]) {
    // Flatten nested routes
    const flattenRoutes = routes.flat();

    flattenRoutes.forEach(route => {
      const matcher = this.matcher.getRecordMatcher(route.name);
      if (matcher) return;

      // Add route
      this.#addRoute(route);
      // Transform to react-router route
      const reactRoute = this.getReactRoutes(route);
      // Add to react-router's routes
      this.reactRoutes.push(reactRoute);
    });

    // Update react-router's routes
    this.reactRouter._internalSetRoutes([...this.initReactRoutes, ...this.reactRoutes]);
  }

  #onBeforeRouteChange = (
    { currentLocation, nextLocation }: Parameters<BlockerFunction>[0],
    beforeEach: RouterOptions['beforeEach'],
    firstInit: (allNames: string[]) => void
  ) => {
    if (nextLocation.pathname === currentLocation.pathname && this.initRoute) {
      return true;
    }

    if (nextLocation.state === 'reload') return false;

    if (!this.initRoute) {
      Promise.resolve().then(() => {
        firstInit(this.matcher.getAllRouteNames());
      });
      this.initRoute = true;
    }

    const to = this.resolve(nextLocation);

    const matchedRoutes = to.matched;
    const nextRoute = matchedRoutes[matchedRoutes.length - 1];

    const finalPath = getFullPath(nextRoute);

    if (finalPath === this.currentRoute.path || matchedRoutes[0]?.redirect === this.currentRoute.path) {
      return true;
    }

    return beforeEach(to, this.currentRoute, this.#next);
  };

  #next(param?: boolean | string | Location | RouteLocationNamedRaw) {
    if (!param) return false;
    if (typeof param === 'string') {
      this.reactRouter.navigate(param);
    }

    if (typeof param === 'object') {
      const finalRedirectPath = this.resolve(param);
      this.reactRouter.navigate(finalRedirectPath.fullPath);
    }

    return true;
  }

  /**
   * Adds a route or updates an existing one.
   *
   * @param parentOrRoute - The parent route or the route to add.
   * @param route - The route to add if parentOrRoute is a string.
   */
  #addRoute(parentOrRoute: string | ElegantConstRoute, route?: ElegantConstRoute) {
    let parent: Parameters<(typeof this.matcher)['addRoute']>[1] | undefined;
    let record;

    if (typeof parentOrRoute === 'string') {
      parent = this.matcher.getRecordMatcher(parentOrRoute);
      if (import.meta.env.MODE === 'development' && !parent) {
        warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`);
      }
      record = route!;
    } else {
      record = parentOrRoute;
    }

    this.matcher.addRoute(record, parent);
  }

  /**
   * Resolves a location into a normalized route.
   *
   * @param rawLocation - The raw location to resolve.
   * @param currentLocation - The current location.
   * @returns A normalized loaded route location.
   */
  resolve(
    rawLocation: Location | RouteLocationNamedRaw,
    currentLocation?: RouteLocationNamedRaw
  ): RouteLocationNormalizedLoaded {
    const current = { ...(currentLocation || (this.currentRoute as RouteLocationNamedRaw)) };

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

    const matchedRoute = this.matcher.resolve(matcherLocation, current);

    return {
      ...matchedRoute,
      redirectedFrom: undefined
    };
  }

  CustomRouterProvider: (loading: React.ReactNode) => JSX.Element = loading => {
    const reactiveRoute = new Proxy(this.currentRoute, {
      get: (_, key) => this.currentRoute[key as keyof RouteLocationNormalizedLoaded]
    });

    return (
      <RouterContext.Provider value={this}>
        <RouteContext.Provider value={reactiveRoute}>
          <RouterProvider
            fallbackElement={loading}
            router={this.reactRouter}
          />
        </RouteContext.Provider>
      </RouterContext.Provider>
    );
  };

  getRoutes() {
    return this.matcher.getRoutes().map(routeMatcher => routeMatcher.record);
  }

  /**
   * Get route meta by key
   *
   * @param key Route key
   */
  getRouteMetaByKey(key: string) {
    return this.getRoutes().find(route => route.name === key)?.meta || null;
  }

  #afterRouteChange = (state: RouterState, afterEach: RouterOptions['afterEach']) => {
    if (state.navigation.state === 'idle') {
      const from = this.currentRoute;
      this.currentRoute = this.resolve(state.location);

      afterEach(this.currentRoute, from);
    }
  };

  getAllRouteNames() {
    return this.matcher.getAllRouteNames();
  }

  resetRoute() {
    // Clears the route records array, effectively deleting all route records.
    this.reactRoutes.length = 0;
    // Resets the route matcher so it can begin matching new routes again.
    this.matcher.resetMatcher();
  }

  /**
   * Retrieves a route by its name.
   *
   * @param name - The name of the route.
   * @returns The route record or false if not found.
   */
  getRouteByName(name: string): RouteRecordNormalized | undefined {
    return this.matcher.getRecordMatcher(name)?.record;
  }

  push(to: RouteLocationNamedRaw | string | Location, replace?: true) {
    const target = typeof to === 'string' ? to : this.resolve(to).fullPath;

    if (target !== this.currentRoute.fullPath) {
      this.reactRouter.navigate(target, { replace });
    }
  }

  back() {
    this.go(-1);
  }

  forwardRef() {
    this.go(1);
  }

  go(delta: number) {
    this.reactRouter.navigate(delta);
  }
}

export default CreateRouter;

function cleanParams(params: Record<string, any> | undefined): Record<string, any> {
  if (!params) return {};
  return Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null));
}

function getFullPath(route: RouteRecordNormalized | ElegantConstRoute): string {
  // 如果当前 route 存在并且有 children
  if (route && route.children && route.children.length > 0) {
    // 获取第一个子路由
    const firstChild = route.children[0];
    // 递归调用，继续拼接子路由的 path
    return `${route.path}/${getFullPath(firstChild)}`;
  }
  // 如果没有 children，返回当前 route 的 path
  return route.path;
}
