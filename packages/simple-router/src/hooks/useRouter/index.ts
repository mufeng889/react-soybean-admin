import { createContext, useContext } from 'react';
import type { Router } from '../../router';

export const RouterContext = createContext<Router>({} as Router);
export function useRouter() {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('useRouter must be used within a Provider');
  }

  return router;
}
