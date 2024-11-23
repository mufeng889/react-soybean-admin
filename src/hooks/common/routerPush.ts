import type { RouteKey } from '@elegant-router/types';
import { useRoute, useRouter } from '@sa/simple-router';
import type { RouteLocationNamedRaw } from '@sa/simple-router';

interface RouterPushOptions {
  params?: Record<string, string>;
  query?: Record<string, string>;
}

/**
 * Router push
 *
 * Jump to the specified route, it can replace function router.push
 */
export function useRouterPush() {
  const router = useRouter();

  const route = useRoute();

  const [searchParams] = useSearchParams();

  const routerPush = router.push;

  const routerBack = router.back;

  async function routerPushByKey(key: RouteKey, options?: RouterPushOptions) {
    const { params, query } = options || {};

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

    meta?.query?.forEach((item: { key: string | number; value: any }) => {
      query[item.key] = item.value;
    });

    return query;
  };

  function routerPushByKeyWithMetaQuery(key: string) {
    const query = getRouteQueryOfMetaByKey(key);

    return routerPushByKey(key as RouteKey, { query });
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

    const options: RouterPushOptions = {};

    const redirect = redirectUrl || route.fullPath;

    options.query = {
      redirect
    };

    return routerPushByKey(`login_${module}`, options);
  }

  /**
   * Toggle login module
   *
   * @param module
   */
  async function toggleLoginModule(module: UnionKey.LoginModule) {
    const query = route.query as Record<string, string>;

    return routerPushByKey(`login_${module}`, { query });
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
    redirectFromLogin,
    routerBack,
    routerPush,
    routerPushByKey,
    routerPushByKeyWithMetaQuery,
    toggleLoginModule,
    toLogin
  };
}
