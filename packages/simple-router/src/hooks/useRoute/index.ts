import { useContext } from 'react';
import { RouteContext } from '../../router';
export function useRoute() {
  const route = useContext(RouteContext);
  if (!route) {
    throw new Error('useRoute must be used within a Provider');
  }
  return route;
}
