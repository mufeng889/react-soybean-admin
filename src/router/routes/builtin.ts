import type { CustomRoute } from '@elegant-router/types';
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import type { ActionFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { store } from '@/store';
import { resetStore } from '@/store/slice/auth';
import { getRoutePath } from '../elegant/transform';

export const ROOT_ROUTE: CustomRoute = {
  name: 'root',
  path: '/',
  redirect: getRoutePath(import.meta.env.VITE_ROUTE_HOME) || '/home',
  meta: {
    title: 'root',
    constant: true
  }
};

const NOT_FOUND_ROUTE: CustomRoute = {
  name: 'not-found',
  path: '*',
  component: '$view.404',
  meta: {
    title: 'not-found',
    constant: true
  }
};

/** - logout route 通过 action 触发做相关的登出操作 */
/** - logout route triggers related logout operations through the action */
const LOG_OUT_ROUTE: CustomRoute = {
  name: 'logout',
  path: '/logout',
  action: async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    store.dispatch(resetStore());

    // 如果需要还需要调用登出接口  也是在这里 去做相关的操作
    // If needed, you can also call the logout API and perform related operations here

    const needRedirect = formData.get('needRedirect');

    if (needRedirect) {
      const redirectFullPath = formData.get('redirectFullPath');
      return redirect(`/login/pwd-login?redirect=${redirectFullPath}`);
    }

    return redirect('/login/pwd-login');
  },
  meta: {
    title: 'logout',
    i18nKey: 'route.logout',
    hideInMenu: true
  }
};

/** builtin routes, it must be constant and setup in vue-router */
export const builtinRoutes: ElegantConstRoute[] = [ROOT_ROUTE, NOT_FOUND_ROUTE, LOG_OUT_ROUTE];
