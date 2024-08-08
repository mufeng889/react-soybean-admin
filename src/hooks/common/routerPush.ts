import { useSearchParams } from 'react-router-dom';
import { startTransition } from 'react';
import { router } from '@/router';

/**
 * Router push
 *
 * Jump to the specified route, it can replace function router.push
 */
export function useRouterPush() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const routerBack = () => {
    router.reactRouter.navigate(-1);
  };

  async function toHome() {
    return router.push('/');
  }

  function getQuery() {
    const query: Record<string, string> = {};
    for (const pairs of searchParams.entries()) {
      query[pairs[0]] = pairs[1];
    }
    return query;
  }

  /**
   * Navigate to login page
   *
   * @param loginModule The login module
   * @param redirectUrl The redirect url, if not specified, it will be the current route fullPath
   */
  async function toLogin(loginModule?: UnionKey.LoginModule, redirectUrl?: string) {
    const module = loginModule || 'pwd-login';

    const redirect = redirectUrl || pathname;

    return router.reactRouter.navigate({ pathname: `/login/${module}`, search: `redirect=${redirect}` });
  }
  function objectToQueryParams(obj: Record<string, string | number>) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        params.append(key, obj[key] as string);
      }
    }
    return params.toString();
  }

  /**
   * Get route query of meta by key
   *
   * @param key
   */
  const getRouteQueryOfMetaByKey = (key: string) => {
    const meta = router.getRouteMetaByKey(key);

    const query: Record<string, any> = {};

    meta?.query?.forEach(item => {
      query[item.key] = item.value;
    });

    return query;
  };

  const menuPush = (key: string) => {
    startTransition(() => {
      const query = getRouteQueryOfMetaByKey(key);
      router.push({ name: key, query });
    });
  };

  /**
   * Toggle login module
   *
   * @param module
   */
  function toggleLoginModule(module: UnionKey.LoginModule) {
    const query = getQuery();

    router.reactRouter.navigate({
      pathname: `/login/${module}`,
      search: objectToQueryParams(query)
    });
  }

  /** Redirect from login */
  function redirectFromLogin() {
    const redirect = searchParams.get('redirect');

    if (redirect) {
      router.reactRouter.navigate(redirect);
    } else {
      toHome();
    }
  }
  return {
    routerPush: router,
    routerBack,
    toLogin,
    menuPush,
    redirectFromLogin,
    toggleLoginModule
  };
}
