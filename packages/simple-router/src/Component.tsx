import { RouterProvider as Provider } from 'react-router-dom';
import { RouterContext } from './hooks/useRouter';
import type { Router } from './router';

export type RouterProviderProps = {
  router: Router;
  fallback?: React.ReactNode;
};

const RouterProvider = ({ router, fallback }: RouterProviderProps) => {
  return (
    <RouterContext.Provider value={router}>
      <Provider
        fallbackElement={fallback}
        router={router.reactRouter}
      />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
