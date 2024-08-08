import { useContext } from 'react';
import { RouterContext } from '../../router';

export function useRouter() {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('useRouter must be used within a Provider');
  }
  return router;
}
