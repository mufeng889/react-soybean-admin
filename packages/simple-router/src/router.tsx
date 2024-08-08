import type { Location, RouteObject } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import type { BlockerFunction, Router as RemixRouter, RouterState } from '@remix-run/router';
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import { createContext } from 'react';
import type { RouteLocationNamedRaw, RouteLocationNormalizedLoaded, Router, RouterOptions } from './types';
import CreateRouterMatcher from './matcher';
import type { RouteRecordNormalized } from './matcher/types';
import { START_LOCATION_NORMALIZED } from './types';

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

export const RouterContext = createContext<Router>({} as Router);
export const RouteContext = createContext<RouteLocationNormalizedLoaded>(START_LOCATION_NORMALIZED);

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
      this.onBeforeRouteChange(arg, beforeEach, firstInit)
    );

    this.reactRouter.subscribe((state: RouterState) => this.afterRouteChange(state, afterEach));
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
      // Add route
      this.#addRoute(route);
      // Transform to react-router route
      const reactRoute = this.getReactRoutes(route);
      // Add to react-router's routes
      this.reactRoutes.push(reactRoute);
    });

    // Update react-router's routes
    // eslint-disable-next-line no-underscore-dangle
    this.reactRouter._internalSetRoutes([...this.initReactRoutes, ...this.reactRoutes]);
  }

  onBeforeRouteChange = (
    { currentLocation, nextLocation }: Parameters<BlockerFunction>[0],
    beforeEach: RouterOptions['beforeEach'],
    firstInit: (allNames: string[]) => void
  ) => {
    if (nextLocation.pathname === currentLocation.pathname && this.initRoute) {
      return true;
    }

    if (!this.initRoute) {
      Promise.resolve().then(() => {
        firstInit(this.matcher.getAllRouteNames());
      });
      this.initRoute = true;
    }

    const to = this.resolve(nextLocation);

    if (to.matched[0]?.redirect === this.currentRoute.path) return true;

    const next = (param?: boolean | string) => {
      if (!param) return false;
      if (typeof param === 'string') {
        this.reactRouter.navigate(param);
      }
      return true;
    };
    return beforeEach(to, this.currentRoute, next);
  };

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
      // if (import.meta.env.MODE === 'development' && !parent) {
      //   warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`);
      // }
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
      // remove any nullish param
      const targetParams: Record<string, any> = {};
      for (const key in rawLocation.params) {
        if (rawLocation.params[key] !== null || rawLocation.params[key] !== undefined) {
          targetParams[key] = rawLocation.params[key];
        }
      }
      const targetQuery: Record<string, any> = {};
      for (const key in rawLocation.query) {
        if (rawLocation.query[key] !== null || rawLocation.query[key] !== undefined) {
          targetQuery[key] = rawLocation.query[key];
        }
      }
      // pass encoded values to the matcher, so it can produce encoded path and fullPath

      matcherLocation = Object.assign(rawLocation, {
        params: targetParams,
        query: targetQuery
      });
    }

    const matchedRoute = this.matcher.resolve(matcherLocation, current);

    return {
      ...matchedRoute,
      redirectedFrom: undefined
    };
  }

  CustomRouterProvider: () => JSX.Element = () => {
    const reactiveRoute = {} as RouteLocationNormalizedLoaded;
    // eslint-disable-next-line guard-for-in
    for (const key in START_LOCATION_NORMALIZED) {
      Object.defineProperty(reactiveRoute, key, {
        // eslint-disable-next-line no-loop-func
        get: () => this.currentRoute[key as keyof RouteLocationNormalizedLoaded],
        enumerable: true
      });
    }

    return (
      <RouterContext.Provider value={this}>
        <RouteContext.Provider value={reactiveRoute}>
          <RouterProvider
            fallbackElement={'加载中'}
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
    const allRoutes = this.getRoutes();

    return allRoutes.find(route => route.name === key)?.meta || null;
  }

  afterRouteChange = (state: RouterState, afterEach: RouterOptions['afterEach']) => {
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
    const route = this?.matcher.getRecordMatcher(name);
    return route?.record;
  }

  push(to: RouteLocationNamedRaw | string) {
    if (typeof to === 'string') {
      this.reactRouter.navigate(to);
      return;
    }

    const toLocation = this.resolve(to);

    const finalRedirectName = getChildrenName(toLocation.matched[toLocation.matched.length - 1]);
    if (finalRedirectName === this.currentRoute.name) {
      return;
    }

    this.reactRouter.navigate(toLocation.fullPath);
  }
}

export default CreateRouter;

function getChildrenName(route: RouteRecordNormalized | ElegantConstRoute): string | undefined {
  // If the route has children, recursively call this function for the first child route
  if (route?.children) {
    return getChildrenName(route.children[0]);
  }

  // If the route has no children, return the name of the route itself
  return route?.name;
}
