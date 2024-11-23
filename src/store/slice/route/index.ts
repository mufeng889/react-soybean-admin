import type { CustomRoute, ElegantConstRoute, LastLevelRouteKey, RouteKey } from '@elegant-router/types';
import type { PayloadAction } from '@reduxjs/toolkit';

import { router } from '@/router';
import { getRoutePath } from '@/router/elegant/transform';
import { createStaticRoutes } from '@/router/routes';
import { ROOT_ROUTE } from '@/router/routes/builtin';
import { fetchGetConstantRoutes, fetchGetUserRoutes } from '@/service/api';
import { isStaticSuper, selectUserInfo } from '@/store/slice/auth';
import { initHomeTab } from '@/store/slice/tab';

import type { AppThunk } from '../..';
import { createAppSlice } from '../../createAppSlice';

import { filterAuthRoutesByRoles, getCacheRouteNames, sortRoutesByOrder } from './shared';

interface InitialStateType {
  authRoutes: ElegantConstRoute[];
  cacheRoutes: RouteKey[];
  constantRoutes: ElegantConstRoute[];
  isInitAuthRoute: boolean;
  isInitConstantRoute: boolean;
  removeCacheKey: RouteKey | null;
  routeHome: string;
  sortRoutes: ElegantConstRoute[];
}

const initialState: InitialStateType = {
  /** auth routes */
  authRoutes: [],
  cacheRoutes: [],
  constantRoutes: [],
  isInitAuthRoute: false,
  isInitConstantRoute: false,
  removeCacheKey: null,
  /** Home route key */
  routeHome: import.meta.env.VITE_ROUTE_HOME,
  sortRoutes: []
};

export const routeSlice = createAppSlice({
  initialState,
  name: 'route',
  reducers: create => ({
    addCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey>) => {
      state.cacheRoutes.push(payload);
    }),

    /** Get global menus */
    addSortRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      state.sortRoutes.push(...payload);
    }),
    removeCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey>) => {
      state.cacheRoutes = state.cacheRoutes.filter(route => route !== payload);
    }),

    resetRoute: create.reducer(() => initialState),

    /** auth routes */
    setAuthRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      const authRoutesMap = new Map<string, ElegantConstRoute>([]);
      payload.forEach(route => {
        authRoutesMap.set(route.name, route);
      });
      state.authRoutes = Array.from(authRoutesMap.values());
    }),

    setCacheRoutes: create.reducer((state, { payload }: PayloadAction<RouteKey[]>) => {
      state.cacheRoutes = payload;
    }),

    /** add constant routes */
    setConstantRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      const constantRoutesSet = new Set<ElegantConstRoute>(payload);
      state.constantRoutes = Array.from(constantRoutesSet);
    }),

    setIsInitAuthRoute: create.reducer((state, { payload }: PayloadAction<boolean>) => {
      state.isInitAuthRoute = payload;
    }),
    setIsInitConstantRoute: create.reducer((state, { payload }: PayloadAction<boolean>) => {
      state.isInitConstantRoute = payload;
    }),
    setRemoveCacheKey: create.reducer((state, { payload }: PayloadAction<RouteKey | null>) => {
      state.removeCacheKey = payload;
    }),

    /** Set route home */
    setRouteHome: create.reducer((state, { payload }: PayloadAction<LastLevelRouteKey>) => {
      state.routeHome = payload;
    }),

    setSortRoutes: create.reducer((state, { payload }: PayloadAction<ElegantConstRoute[]>) => {
      state.sortRoutes = payload;
    })
  }),
  selectors: {
    getAllRoutes: state => [...state.constantRoutes, ...state.authRoutes],
    getAuthRoutes: route => route.authRoutes,
    getConstantRoutes: route => route.constantRoutes,
    getIsInitConstantRoute: route => route.isInitConstantRoute,
    getRemoveCacheKey: state => state.removeCacheKey,
    getRouteHome: route => route.routeHome,
    getSortRoutes: route => route.sortRoutes,
    selectCacheRoutes: state => state.cacheRoutes
  }
});

export const {
  addCacheRoutes,
  addSortRoutes,
  removeCacheRoutes,
  resetRoute,
  setAuthRoutes,
  setCacheRoutes,
  setConstantRoutes,
  setIsInitAuthRoute,
  setIsInitConstantRoute,
  setRemoveCacheKey,
  setRouteHome,
  setSortRoutes
} = routeSlice.actions;

export const {
  getAllRoutes,
  getAuthRoutes,
  getConstantRoutes,
  getIsInitConstantRoute,
  getRemoveCacheKey,
  getRouteHome,
  getSortRoutes,
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
  (mode: 'auth' | 'constant'): AppThunk =>
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
    const { home, routes } = data;

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

  if (homeRoute) dispatch(initHomeTab({ homeRouteName: routeHomeName as LastLevelRouteKey, route: homeRoute }));
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
