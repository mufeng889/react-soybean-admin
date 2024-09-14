import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import type { Location, RouteObject } from 'react-router-dom';
import type { Router as RemixRouter } from '@remix-run/router';
import type { RouteRecordNormalized } from '../matcher/types';
import type { RouteLocationNormalizedLoaded } from './route';
export interface RouterOptions {
  initRoutes: ElegantConstRoute[];
  history: 'hash' | 'history' | 'memory';
  basename: string;
  getReactRoutes(route: ElegantConstRoute): RouteObject;
  init(reactRouter: RemixRouter): Promise<void>;
  beforeEach: BeforeEach;
  afterEach: AfterEach;
  firstInit: (allNames: string[]) => void;
}

/** Router instance. */
export interface Router {
  readonly currentRoute: RouteLocationNormalizedLoaded;
  push: (to: RouteLocationNamedRaw) => void;
  readonly reactRouter: RemixRouter;
  readonly reactRoutes: RouteObject[];
  addReactRoutes: (routes: ElegantConstRoute[]) => void;
  CustomRouterProvider: (loading: React.ReactNode) => JSX.Element;
  getRoutes: () => RouteRecordNormalized[];
  getRouteByName: (name: string) => RouteRecordNormalized | undefined;
  resetRoute: () => void;
  getAllRouteNames: () => string[];
  back: () => void;
  forwardRef: () => void;
  go: (delta: number) => void;
  removeRoute: (name: string) => void;
}

export type NavigationGuardNext = (
  param?: boolean | undefined | null | string | Location | RouteLocationNamedRaw
) => boolean;

export type BeforeEach = (
  to: RouteLocationNormalizedLoaded,
  from: RouteLocationNormalizedLoaded,
  blockerOrJump: NavigationGuardNext
) => boolean;

export type AfterEach = (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => void;

export type HistoryStateArray = Array<HistoryStateValue>;

export type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;

export interface HistoryState {
  [x: number]: HistoryStateValue;
  [x: string]: HistoryStateValue;
}

export interface RouteLocationOptions {
  /** Replace the entry in the history instead of pushing a new entry */
  replace?: boolean;

  /**
   * State to save using the History API. This cannot contain any reactive values and some primitives like Symbols are
   * forbidden. More info at https://developer.mozilla.org/en-US/docs/Web/API/History/state
   */
  state?: HistoryState;
}

/**
 * Possible values in normalized {@link LocationQuery}. `null` renders the query param but without an `=`.
 *
 * @example
 *   ```
 *   ?isNull&isEmpty=&other=other
 *   gives
 *   `{ isNull: null, isEmpty: '', other: 'other' }`.
 *   ```
 *
 * @internal
 */

export type LocationQueryValue = string | null;

/**
 * Possible values when defining a query.
 *
 * @internal
 */
export type LocationQueryValueRaw = LocationQueryValue | number | undefined;

/**
 * Normalized query object that appears in {@link RouteLocationNormalized}
 *
 * @public
 */
export type RouteParamValue = string;

export type RouteParamValueRaw = RouteParamValue | number | null | undefined;

export type LocationQuery = Record<string, LocationQueryValue | LocationQueryValue[]>;

export type RouteParamsRaw = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>;

export interface LocationAsRelativeRaw {
  name: string;
  path?: string;
  params?: RouteParamsRaw;
}

export type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

/** @internal */
export interface RouteQueryAndHash {
  query?: LocationQueryRaw;
  hash?: string;
}

/**
 * Route Location that can infer the necessary params based on the name.
 *
 * @internal
 */
export interface RouteLocationNamedRaw extends RouteQueryAndHash, LocationAsRelativeRaw, RouteLocationOptions {}

export type Init = (currentFullPath: string) => Promise<RouteLocationNamedRaw | null>;
