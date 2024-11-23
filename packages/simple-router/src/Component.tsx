import { useLayoutEffect, useState } from 'react';
import { RouterProvider as Provider } from 'react-router-dom';

import { RouteContext } from './hooks/useRoute';
import { RouterContext } from './hooks/useRouter';
import type { Router } from './router';

export type RouterProviderProps = {
  readonly fallback?: React.ReactNode;
  readonly router: Router;
};

const RouterProvider = ({ fallback, router }: RouterProviderProps) => {
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
