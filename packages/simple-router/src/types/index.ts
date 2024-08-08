import type { ElegantConstRoute, RouteMeta } from '@ohh-889/react-auto-route';
import type { Router as RemixRouter } from '@remix-run/router';
import type { RouteObject } from 'react-router-dom';
import type { RouteRecordNormalized } from '../matcher/types';

/** Internal type for common properties among all kind of {@link RouteRecordRaw}. */
export interface _RouteRecordBase {
  /**
   * Path of the record. Should start with `/` unless the record is the child of another record.
   *
   * @example
   *   `/users/:id` matches `/users/1` as well as `/users/posva`.
   */
  path: string;

  /**
   * Where to redirect if the route is directly matched. The redirection happens before any navigation guard and
   * triggers a new navigation with the new target location.
   */
  redirect?: string;

  /** Name for the route record. Must be unique. */
  name?: string;

  /** Arbitrary data attached to the record. */
  meta?: RouteMeta;

  /** Array of nested routes. */
  children?: _RouteRecordBase[];
}
export type BeforeEach = (
  to: RouteLocationNormalizedLoaded,
  from: RouteLocationNormalizedLoaded,
  next: (param?: boolean | undefined | string) => boolean
) => boolean;

export type AfterEach = (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => void;

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
export interface _RouteLocationBase extends Omit<RouteRecordNormalized, 'children'> {
  /** The whole location including the `search` and `hash`. This string is percentage encoded. */
  fullPath: string;
  /** Object representation of the `search` property of the current location. */
  query: Record<string, any>;
  /** Hash of the current location. If present, starts with a `#`. */
  hash: string | undefined;
  /** Contains the location we were initially trying to access before ending up on the current location. */
  redirectedFrom: _RouteLocationBase | undefined;
}

export interface RouteLocationNormalizedLoaded extends _RouteLocationBase {
  /**
   * Array of {@link RouteLocationMatched} containing only plain components (any lazy-loaded components have been loaded
   * and were replaced inside the `components` object) so it can be directly used to display routes. It cannot contain
   * redirect records either
   */
  matched: RouteRecordNormalized[]; // non-enumerable
}

export const START_LOCATION_NORMALIZED: RouteLocationNormalizedLoaded = {
  path: '/',
  name: undefined,
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  component: '',
  redirectedFrom: undefined
};

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
}
export interface HistoryStateArray extends Array<HistoryStateValue> {}
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
