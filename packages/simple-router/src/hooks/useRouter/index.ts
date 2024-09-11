import { createContext, useContext } from 'react';

export const RouterContext = createContext<any>({});
export function useRouter() {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('useRouter must be used within a Provider');
  }

  return router;
}
