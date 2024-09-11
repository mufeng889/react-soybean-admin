import type { RouteLocationNamedRaw, RouteLocationNormalizedLoaded } from './types';

/**
 * Flags so we can combine them when checking for multiple errors. This is the internal version of
 * {@link NavigationFailureType}.
 *
 * @internal
 */
export enum ErrorTypes {
  // they must be literals to be used as values, so we can't write
  // 1 << 2
  MATCHER_NOT_FOUND = 1,
  NAVIGATION_GUARD_REDIRECT = 2,
  NAVIGATION_ABORTED = 4,
  NAVIGATION_CANCELLED = 8,
  NAVIGATION_DUPLICATED = 16
}

export interface MatcherError extends Error {
  type: ErrorTypes.MATCHER_NOT_FOUND;
  location: RouteLocationNamedRaw;
  currentLocation?: RouteLocationNormalizedLoaded;
}

/**
 * Internal error used to detect a redirection.
 *
 * @internal
 */
export interface NavigationRedirectError extends Omit<NavigationFailure, 'to' | 'type'> {
  type: ErrorTypes.NAVIGATION_GUARD_REDIRECT;
  to: RouteLocationNormalizedLoaded;
}

// Possible internal errors
type RouterError = NavigationFailure | NavigationRedirectError | MatcherError;

/** Extended Error that contains extra information regarding a failed navigation. */
export interface NavigationFailure extends Error {
  /** Type of the navigation. One of {@link NavigationFailureType} */
  type: ErrorTypes.NAVIGATION_CANCELLED | ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED;
  /** Route location we were navigating from */
  from: RouteLocationNormalizedLoaded;
  /** Route location we were navigating to */
  to: RouteLocationNormalizedLoaded;
}

// DEV only debug messages
const ErrorTypeMessages = {
  [ErrorTypes.MATCHER_NOT_FOUND]({ location, currentLocation }: MatcherError) {
    return `No match for\n ${JSON.stringify(location)}${
      currentLocation ? `\nwhile being at\n${JSON.stringify(currentLocation)}` : ''
    }`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }: NavigationRedirectError) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }: NavigationFailure) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }: NavigationFailure) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from }: NavigationFailure) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};

const NavigationFailureSymbol = Symbol(import.meta.env.MODE === 'development' ? 'navigation failure' : '');

/**
 * Creates a typed NavigationFailure object.
 *
 * @param type - NavigationFailureType
 * @param params - { from, to }
 * @internal
 */
export function createRouterError<E extends RouterError>(type: E['type'], params: Omit<E, 'type' | keyof Error>): E {
  // keep full error messages in cjs versions
  if (import.meta.env.MODE === 'development') {
    return Object.assign(
      new Error(ErrorTypeMessages[type](params as any)),
      {
        type,
        [NavigationFailureSymbol]: true
      } as { type: typeof type },
      params
    ) as E;
  }
  return Object.assign(
    new Error('Route not found'),
    {
      type,
      [NavigationFailureSymbol]: true
    } as { type: typeof type },
    params
  ) as E;
}

const propertiesToLog = ['query', 'hash'] as const;

function stringifyRoute(to: RouteLocationNormalizedLoaded): string {
  if (typeof to === 'string') return to;
  if (to.path !== null) return to.path;
  const location = {} as Record<string, unknown>;
  for (const key of propertiesToLog) {
    if (key in to) location[key] = to[key];
  }
  return JSON.stringify(location, null, 2);
}
