import type { RouteMeta } from '@ohh-889/react-auto-route';
import type { RouteRecordNormalized } from '../matcher/types';

export interface _RouteLocationBase extends Omit<RouteRecordNormalized, 'children'> {
  /** The whole location including the `search` and `hash`. This string is percentage encoded. */
  fullPath: string;
  /** Object representation of the `search` property of the current location. */
  query: Record<string, any>;
  /** Hash of the current location. If present, starts with a `#`. */
  hash: string | undefined;
  /** Contains the location we were initially trying to access before ending up on the current location. */
  redirectedFrom: _RouteLocationBase | undefined;
  params: Record<string, any>;
}

export interface RouteLocationNormalizedLoaded extends _RouteLocationBase {
  /**
   * Array of {@link RouteLocationMatched} containing only plain components (any lazy-loaded components have been loaded
   * and were replaced inside the `components` object) so it can be directly used to display routes. It cannot contain
   * redirect records either
   */
  matched: RouteRecordNormalized[]; // non-enumerable
  state: Record<string, any> | null;
}

export interface Route extends RouteLocationNormalizedLoaded {
  params: Record<string, string>;
}

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
