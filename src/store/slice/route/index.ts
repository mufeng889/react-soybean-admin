import type { ElegantConstRoute, LastLevelRouteKey } from '@elegant-router/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createStaticRoutes } from '@/router/routes';
import { fetchGetConstantRoutes } from '@/service/api';
import { router } from '@/router';
import { isStaticSuper, selectUserInfo } from '@/store/slice/auth';
import { initHomeTab } from '@/store/slice/tab';
import type { AppThunk } from '../../index';
import { createAppSlice } from '../../createAppSlice';
import { filterAuthRoutesByRoles, sortRoutesByOrder } from './shared';

interface InitialStateType {
  authRoutes: ElegantConstRoute[];
  sortRoutes: ElegantConstRoute[];
  isInitConstantRoute: boolean;
  isInitAuthRoute: boolean;
  constantRoutes: ElegantConstRoute[];
  routeHome: string;
}

const initialState: InitialStateType = {
  /** auth routes */
  authRoutes: [],
  isInitAuthRoute: false,
  sortRoutes: [],
  constantRoutes: [],
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
    getRouteHome: route => route.routeHome
  }
});

export const {
  setAuthRoutes,
  addSortRoutes,
  setIsInitConstantRoute,
  setConstantRoutes,
  setIsInitAuthRoute,
  resetRoute,
  setSortRoutes
} = routeSlice.actions;

export const { getAuthRoutes, getSortRoutes, getIsInitConstantRoute, getConstantRoutes, getAllRoutes, getRouteHome } =
  routeSlice.selectors;

const authRouteMode = import.meta.env.VITE_AUTH_ROUTE_MODE;

/**
 * Navigate to login page
 *
 * @param loginModule The login module
 * @param redirectUrl The redirect url, if not specified, it will be the current route fullPath
 */
export const toLogin =
  (redirectUrl?: string): AppThunk =>
  () => {
    const nowRouteFullPath = router.currentRoute.fullPath;

    const redirect = redirectUrl || nowRouteFullPath;

    router.push({ name: 'login_pwd-login', query: { redirect } });
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
  };
export const initConstantRoute = (): AppThunk => async dispatch => {
  const staticRoute = createStaticRoutes();

  if (authRouteMode === 'static') {
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
export const initAuthRoute = (): AppThunk => (dispatch, getState) => {
  if (authRouteMode === 'static') {
    dispatch(initStaticAuthRoute());
  }
  const routeHomeName = getRouteHome(getState());
  const homeRoute = router.getRouteByName(routeHomeName);
  if (homeRoute) dispatch(initHomeTab({ route: homeRoute, homeRouteName: routeHomeName as LastLevelRouteKey }));
};

export const resetRouteStore = (): AppThunk => dispatch => {
  const currentRoute = router.currentRoute;
  if (!currentRoute.meta?.constant) {
    dispatch(toLogin());
  }
  setTimeout(() => {
    dispatch(resetRoute());
    router.resetRoute();
    dispatch(initConstantRoute());
  }, 100);
};
