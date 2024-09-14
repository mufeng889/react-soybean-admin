import { createContext, useContext } from 'react';
import type { Route } from '../../types';

export const RouteContext = createContext<Route>({} as Route);
export function useRoute() {
  const route = useContext(RouteContext);
  if (!route) {
    throw new Error('useRouter must be used within a Provider');
  }

  return route;
}
