import { Breadcrumb } from 'antd';
import { cloneElement } from 'react';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { MenuItemType } from 'antd/es/menu/interface';
import type { BreadcrumbProps } from 'antd';
import { useRouterPush } from '@/hooks/common/routerPush';
import { getBreadcrumbsByRoute } from './shared';

function BreadcrumbContent({ label, icon }: { label: JSX.Element; icon: JSX.Element }) {
  return (
    <div className="i-flex-y-center align-middle">
      {cloneElement(icon, { className: 'mr-4px text-icon', ...icon.props })}
      {label}
    </div>
  );
}

const GlobalBreadcrumb: FC<Omit<BreadcrumbProps, 'items'>> = props => {
  const { allMenus: menus, route } = useMixMenuContext();

  const routerPush = useRouterPush();

  const breadcrumb = getBreadcrumbsByRoute(route, menus);

  function handleClickMenu(menuInfo: MenuInfo) {
    routerPush.routerPushByKeyWithMetaQuery(menuInfo.key);
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
    />
  );
};

export default GlobalBreadcrumb;
