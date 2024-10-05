import type { ElegantConstRoute } from '@elegant-router/types';
import { $t } from '@/locales';

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 */
export function getGlobalMenusByAuthRoutes(routes: ElegantConstRoute[]) {
  const menus: App.Global.Menu[] = [];

  routes.forEach(route => {
    if (!route.meta?.hideInMenu) {
      const menu = getGlobalMenuByBaseRoute(route);

      if (route.children?.some(child => !child.meta?.hideInMenu)) {
        menu.children = getGlobalMenusByAuthRoutes(route.children) || [];
      }

      menus.push(menu);
    }
  });

  return menus;
}

/**
 * Get global menu by route
 *
 * @param route
 */
export function getGlobalMenuByBaseRoute(route: ElegantConstRoute): App.Global.Menu {
  const { name } = route;

  const { title, i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon } = route.meta ?? {};

  const label = i18nKey ? $t(i18nKey) : title;

  const menu: App.Global.Menu = {
    key: name,
    label: <BeyondHiding title={label} />,
    icon: (
      <SvgIcon
        icon={icon}
        style={{ fontSize: '20px' }}
        localIcon={localIcon}
      />
    ),
    title: label
  };

  return menu;
}
