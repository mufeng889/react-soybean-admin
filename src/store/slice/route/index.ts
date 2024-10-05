import type { CustomRoute, ElegantConstRoute, LastLevelRouteKey, RouteKey } from '@elegant-router/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createStaticRoutes } from '@/router/routes';
import { fetchGetConstantRoutes, fetchGetUserRoutes } from '@/service/api';
import { router } from '@/router';
import { isStaticSuper, selectUserInfo } from '@/store/slice/auth';
import { initHomeTab } from '@/store/slice/tab';
import { getRoutePath } from '@/router/elegant/transform';
import { ROOT_ROUTE } from '@/router/routes/builtin';
import type { AppThunk } from '../../index';
import { createAppSlice } from '../../createAppSlice';
import { filterAuthRoutesByRoles, getCacheRouteNames, sortRoutesByOrder } from './shared';

interface InitialStateType {
  authRoutes: ElegantConstRoute[];
  sortRoutes: ElegantConstRoute[];
  isInitConstantRoute: boolean;
  isInitAuthRoute: boolean;
  constantRoutes: ElegantConstRoute[];
  routeHome: string;
  removeCacheKey: RouteKey | null;
  cacheRoutes: RouteKey[];
}

const initialState: InitialStateType = {
  /** auth routes */
  authRoutes: [],
  isInitAuthRoute: false,
  sortRoutes: [],
  constantRoutes: [],
  removeCacheKey: null,
  cacheRoutes: [],
  isInitConstantRoute: false,
  /** Home route key */
  routeHome: import.meta.env.VITE_ROUTE_HOME
};

export const routeSlice = createAppSlice({
  name: 'route',
  initialState,
  reducers: create => ({
    /** auth routes */
    setAuthRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      const authRoutesMap = new Map<string, ElegantConstRoute>([]);
      payload.forEach(route => {
        authRoutesMap.set(route.name, route);
      });
      state.authRoutes = Array.from(authRoutesMap.values());
    }),

    /** Get global menus */
    addSortRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      state.sortRoutes.push(...payload);
    }),
    setSortRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      state.sortRoutes = payload;
    }),

    setCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey[]>) => {
      state.cacheRoutes = payload;
    }),

    addCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey>) => {
      state.cacheRoutes.push(payload);
    }),

    setRemoveCacheKey: create.reducer((state, { payload }: PayloadAction<RouteKey | null>) => {
      state.removeCacheKey = payload;
    }),

    removeCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey>) => {
      state.cacheRoutes = state.cacheRoutes.filter(route => route !== payload);
    }),

    /** add constant routes */
    setConstantRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      const constantRoutesSet = new Set<ElegantConstRoute>(payload);
      state.constantRoutes = Array.from(constantRoutesSet);
    }),
    setIsInitConstantRoute: create.reducer((state, { payload }: PayloadAction<boolean>) => {
      state.isInitConstantRoute = payload;
    }),
    setIsInitAuthRoute: create.reducer((state, { payload }: PayloadAction<boolean>) => {
      state.isInitAuthRoute = payload;
    }),

    /** Set route home */
    setRouteHome: create.reducer((state, { payload }: PayloadAction<LastLevelRouteKey>) => {
      state.routeHome = payload;
    }),

    resetRoute: create.reducer(() => initialState)
  }),
  selectors: {
    getAuthRoutes: route => route.authRoutes,
    getSortRoutes: route => route.sortRoutes,
    getIsInitConstantRoute: route => route.isInitConstantRoute,
    getAllRoutes: state => [...state.constantRoutes, ...state.authRoutes],
    getConstantRoutes: route => route.constantRoutes,
    getRouteHome: route => route.routeHome,
    selectCacheRoutes: state => state.cacheRoutes,
    getRemoveCacheKey: state => state.removeCacheKey
  }
});

export const {
  setAuthRoutes,
  addSortRoutes,
  setIsInitConstantRoute,
  setConstantRoutes,
  setIsInitAuthRoute,
  resetRoute,
  setSortRoutes,
  setCacheRoutes,
  removeCacheRoutes,
  addCacheRoutes,
  setRouteHome,
  setRemoveCacheKey
} = routeSlice.actions;

export const {
  getAuthRoutes,
  getSortRoutes,
  getIsInitConstantRoute,
  getConstantRoutes,
  getAllRoutes,
  getRouteHome,
  getRemoveCacheKey,
  selectCacheRoutes
} = routeSlice.selectors;

const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;
const constantRouteMode = import.meta.env.VITE_CONSTANT_ROUTE_MODE;

/**
 * Get cache routes
 *
 * @param routes Vue routes
 */
export const getCacheRoutes =
  (routes: ElegantConstRoute[]): AppThunk =>
  dispatch => {
    const alls = getCacheRouteNames(routes);

    dispatch(setCacheRoutes(alls));
  };

const handleConstantOrAuthRoutes =
  (mode: 'constant' | 'auth'): AppThunk =>
  (dispatch, getState) => {
    let routes: ElegantConstRoute[];
    if (mode === 'constant') {
      routes = getConstantRoutes(getState());
    } else {
      routes = getAuthRoutes(getState());
      const constantRoutes = getConstantRoutes(getState());
      dispatch(setSortRoutes(constantRoutes));
    }

    const sortRoutes = sortRoutesByOrder(routes);

    router.addReactRoutes(sortRoutes);

    dispatch(addSortRoutes(sortRoutes));

    dispatch(getCacheRoutes(sortRoutes));
  };

export const initConstantRoute = (): AppThunk => async dispatch => {
  const staticRoute = createStaticRoutes();

  if (constantRouteMode === 'static') {
    dispatch(setConstantRoutes(staticRoute.constantRoutes));
  } else {
    const { data, error } = await fetchGetConstantRoutes();
    if (!error) {
      dispatch(setConstantRoutes(data));
    } else {
      dispatch(setConstantRoutes(staticRoute.constantRoutes));
    }
  }

  dispatch(handleConstantOrAuthRoutes('constant'));

  dispatch(setIsInitConstantRoute(true));
};

const initStaticAuthRoute = (): AppThunk => (dispatch, getState) => {
  const { authRoutes: staticAuthRoutes } = createStaticRoutes();

  if (dispatch(isStaticSuper())) {
    dispatch(setAuthRoutes(staticAuthRoutes));
  } else {
    const userInfo = selectUserInfo(getState());
    const filteredAuthRoutes = filterAuthRoutesByRoles(staticAuthRoutes, userInfo.roles);
    dispatch(setAuthRoutes(filteredAuthRoutes));
  }

  dispatch(handleConstantOrAuthRoutes('auth'));
  dispatch(setIsInitAuthRoute(true));
};

export const resetRouteStore = (): AppThunk => dispatch => {
  router.resetRoute();
  dispatch(resetRoute());
  dispatch(initConstantRoute());
};

/** Init dynamic auth route */
const initDynamicAuthRoute = (): AppThunk => async dispatch => {
  const { data, error } = await fetchGetUserRoutes();

  if (!error) {
    const { routes, home } = data;

    dispatch(setAuthRoutes(routes));

    dispatch(handleConstantOrAuthRoutes('auth'));

    dispatch(setRouteHome(home));

    handleUpdateRootRouteRedirect(home);

    setIsInitAuthRoute(true);
  } else {
    // if fetch user routes failed, reset store
    dispatch(resetRouteStore());
  }
};

export const initAuthRoute = (): AppThunk => async (dispatch, getState) => {
  if (authRouteMode === 'static') {
    dispatch(initStaticAuthRoute());
  } else {
    await dispatch(initDynamicAuthRoute());
  }
  const routeHomeName = getRouteHome(getState());

  const homeRoute = router.getRouteByName(routeHomeName);

  if (homeRoute) dispatch(initHomeTab({ route: homeRoute, homeRouteName: routeHomeName as LastLevelRouteKey }));
};

/**
 * Update root route redirect when auth route mode is dynamic
 *
 * @param redirectKey Redirect route key
 */
function handleUpdateRootRouteRedirect(redirectKey: LastLevelRouteKey) {
  const redirect = getRoutePath(redirectKey);

  if (redirect) {
    const rootRoute: CustomRoute = { ...ROOT_ROUTE, redirect };

    router.removeRoute(rootRoute.name);

    router.addReactRoutes([rootRoute]);
  }
}

/**
 * Is cached route
 *
 * @param routeKey
 */
export const isCachedRoute =
  (routeKey: RouteKey): AppThunk<boolean> =>
  (_, getState) => {
    return selectCacheRoutes(getState()).includes(routeKey);
  };
