import type { Route } from '@sa/simple-router';
import type { ItemType, MenuItemType, SubMenuType } from 'antd/es/menu/interface';

function removeChildren(menu: SubMenuType): Omit<ItemType, 'children'> {
  const { children: _, ...rest } = menu;

  return {
    ...rest
  };
}
// eslint-disable-next-line max-params
export function getBreadcrumbsByRoute(
  route: Route,
  menus: ItemType[],
  index: number = 0,
  breadcrumbs: Extract<ItemType, MenuItemType | SubMenuType>[] = []
) {
  const currentMenu = menus.find(item => item?.key === route.matched[index]?.name) as SubMenuType | undefined;

  if (currentMenu) {
    const flattenedChildren = currentMenu.children?.map(item => {
      if (item && 'children' in item) {
        return removeChildren(item as SubMenuType);
      }
      return item;
    }) as MenuItemType[];

    breadcrumbs.push({ ...currentMenu, children: flattenedChildren });

    if (index < route.matched.length - 1) {
      getBreadcrumbsByRoute(route, currentMenu.children || [], index + 1, breadcrumbs);
    }
  }

  return breadcrumbs;
}
