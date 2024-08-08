import { Breadcrumb } from 'antd';
import { createElement } from 'react';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { ItemType, MenuItemType, SubMenuType } from 'antd/es/menu/interface';
import type { BreadcrumbProps } from 'antd';
import { useRoute } from '@sa/simple-router';
import type { RouteLocationNormalizedLoaded } from '@sa/simple-router';
import { useRouterPush } from '@/hooks/common/routerPush';

const GlobalBreadcrumb: FC<Omit<BreadcrumbProps, 'items'>> = memo(props => {
  const menus = useMenu();
  const route = useRoute();
  const routerPush = useRouterPush();
  const breadcrumb = getBreadcrumbsByRoute(route, menus);

  function handleClickMenu(menuInfo: MenuInfo) {
    routerPush.menuPush(menuInfo.key);
  }

  const items: BreadcrumbProps['items'] = breadcrumb.map((item, index) => {
    const commonTitle = (
      <BreadcrumbContent
        key={item.key}
        label={item.label as JSX.Element}
        icon={item.icon as JSX.Element}
      />
    );

    return {
      title: commonTitle,
      ...('children' in item &&
        item.children && {
          menu: {
            items: item.children.filter(Boolean) as MenuItemType[],
            onClick: handleClickMenu,
            selectedKeys: [breadcrumb[index + 1]?.key] as string[]
          }
        })
    };
  });

  return (
    <Breadcrumb
      {...props}
      items={items}
    ></Breadcrumb>
  );
});

function BreadcrumbContent({ label, icon }: { label: JSX.Element; icon: JSX.Element }) {
  return (
    <div className="i-flex-y-center align-middle">
      {createElement(icon.type, { className: 'mr-4px text-icon', ...icon.props })}
      {label}
    </div>
  );
}

function removeChildren(menu: SubMenuType): Omit<ItemType, 'children'> {
  const { children: _, ...rest } = menu;

  return {
    ...rest
  };
}
// eslint-disable-next-line max-params
function getBreadcrumbsByRoute(
  route: RouteLocationNormalizedLoaded,
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

export default GlobalBreadcrumb;
