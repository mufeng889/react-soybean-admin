import { RouterProvider as Provider } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { RouterContext } from './hooks/useRouter';
import { RouteContext } from './hooks/useRoute';
import type { Router } from './router';

export type RouterProviderProps = {
  router: Router;
  fallback?: React.ReactNode;
};

const RouterProvider = ({ router, fallback }: RouterProviderProps) => {
  const [route, setRoute] = useState(router.resolve(router.reactRouter.state.location));

  useLayoutEffect(
    () =>
      router.reactRouter.subscribe(state => {
        if (state.navigation.state === 'idle') {
          setRoute(router.resolve(state.location));
        }
      }),
    [router, setRoute]
  );

  return (
    <RouterContext.Provider value={router}>
      <RouteContext.Provider value={route}>
        <Provider
          fallbackElement={fallback}
          router={router.reactRouter}
        />
      </RouteContext.Provider>
    </RouterContext.Provider>
  );
};

export default RouterProvider;
