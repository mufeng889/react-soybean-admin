import { startTransition } from 'react';
import { useRouter } from '@sa/simple-router';
import type { RouteKey } from '@elegant-router/types';
import type { RouteLocationNamedRaw } from '@sa/simple-router';

interface RouterPushOptions {
  query?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * Router push
 *
 * Jump to the specified route, it can replace function router.push
 */
export function useRouterPush() {
  const router = useRouter();

  const [searchParams] = useSearchParams();

  const routerPush = router.push;

  const routerBack = router.back;

  async function routerPushByKey(key: RouteKey, options?: RouterPushOptions) {
    const { query, params } = options || {};

    const routeLocation: RouteLocationNamedRaw = {
      name: key
    };

    if (Object.keys(query || {}).length) {
      routeLocation.query = query;
    }

    if (Object.keys(params || {}).length) {
      routeLocation.params = params;
    }

    return routerPush(routeLocation);
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

  function routerPushByKeyWithMetaQuery(key: RouteKey) {
    const query = getRouteQueryOfMetaByKey(key);

    return routerPushByKey(key, { query });
  }

  async function toHome() {
    return routerPush('/');
  }

  /**
   * Navigate to login page
   *
   * @param loginModule The login module
   * @param redirectUrl The redirect url, if not specified, it will be the current route fullPath
   */
  async function toLogin(loginModule?: UnionKey.LoginModule, redirectUrl?: string) {
    const module = loginModule || 'pwd-login';

    const options: RouterPushOptions = {
      params: {
        module
      }
    };

    const redirect = redirectUrl || router.currentRoute.fullPath;

    options.query = {
      redirect
    };

    return routerPushByKey('login', options);
  }

  /**
   * Toggle login module
   *
   * @param module
   */
  async function toggleLoginModule(module: UnionKey.LoginModule) {
    const query = router.currentRoute.query as Record<string, string>;

    return routerPushByKey(`login_${module}`, { query });
  }

  function menuPush(key: string) {
    startTransition(() => {
      routerPushByKeyWithMetaQuery(key as RouteKey);
    });
  }

  /**
   * Redirect from login
   *
   * @param [needRedirect=true] Whether to redirect after login. Default is `true`
   */
  async function redirectFromLogin(needRedirect = true) {
    const redirect = searchParams.get('redirect');

    if (needRedirect && redirect) {
      routerPush(redirect);
    } else {
      toHome();
    }
  }

  return {
    routerPush,
    routerBack,
    toLogin,
    routerPushByKeyWithMetaQuery,
    menuPush,
    redirectFromLogin,
    toggleLoginModule
  };
}
