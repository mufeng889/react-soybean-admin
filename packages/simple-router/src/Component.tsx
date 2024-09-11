import { RouterProvider as Provider } from 'react-router-dom';
import { RouterContext } from './hooks/useRouter';

const RouterProvider = ({ router, fallback }: { router: any; fallback?: React.ReactNode }) => {
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
