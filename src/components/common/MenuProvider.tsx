import type { FC, ReactNode } from 'react';
import { createContext } from 'react';
import type { ElegantConstRoute } from '@elegant-router/types';
import type { RouteMeta } from '@ohh-889/react-auto-route';
import type { MenuItemType, SubMenuType } from 'antd/es/menu/interface';
import { getSortRoutes } from '@/store/slice/route';
import { $t } from '@/locales';
import SvgIcon from '../custom/svg-icon';
import BeyondHiding from '../custom/BeyondHiding';

interface Props {
  children: ReactNode;
}

export const MenuContext = createContext<SubMenuType[]>([]);

const MenuProvider: FC<Props> = ({ children }) => {
  const sortRoutes = useAppSelector(getSortRoutes);

  const menus = getGlobalMenusByAuthRoutes(sortRoutes);

  return <MenuContext.Provider value={menus}>{children}</MenuContext.Provider>;
};

export default MenuProvider;

/**
 * Get global menu by route
 *
 * @param route
 */
function getGlobalMenuByBaseRoute(route: ElegantConstRoute): MenuItemType {
  const { name } = route;
  const {
    title,
    i18nKey,
    icon = import.meta.env.VITE_MENU_ICON,
    localIcon
  } = (route.meta as unknown as RouteMeta) ?? {};

  const label = i18nKey ? $t(i18nKey) : title!;
  const menu: MenuItemType = {
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

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 */
function getGlobalMenusByAuthRoutes(routes: ElegantConstRoute[]) {
  const menus: SubMenuType[] = [];

  routes.forEach(route => {
    if (!route.meta?.hideInMenu) {
      const menu = getGlobalMenuByBaseRoute(route) as SubMenuType;

      if (route.children?.some(child => !child.meta?.hideInMenu)) {
        menu.children = getGlobalMenusByAuthRoutes(route.children) || [];
      }

      menus.push(menu);
    }
  });

  return menus;
}
