import { createContext, useContext } from 'react';
import type { RouteLocationNormalizedLoaded } from '../../types';
import { START_LOCATION_NORMALIZED } from '../../types';

export const RouteContext = createContext<RouteLocationNormalizedLoaded>(START_LOCATION_NORMALIZED);

export function useRoute() {
  const route = useContext(RouteContext);
  if (!route) {
    throw new Error('useRoute must be used within a Provider');
  }
  return route;
}
