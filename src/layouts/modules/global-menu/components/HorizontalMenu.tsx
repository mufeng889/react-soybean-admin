import type { Route } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { MenuProps } from 'antd';
import { useRouterPush } from '@/hooks/common/routerPush';

export interface Props {
  menus: MenuProps['items'];
}

function getSelectKey(route: Route) {
  const { hideInMenu, activeMenu } = route.meta;

  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}

const HorizontalMenu: FC<Props> = memo(({ menus }) => {
  const route = useRoute();

  const router = useRouterPush();

  const selectKey = getSelectKey(route);

  function handleClickMenu(menuInfo: MenuInfo) {
    router.menuPush(menuInfo.key);
  }

  return (
    <AMenu
      mode="horizontal"
      items={menus}
      inlineIndent={18}
      onSelect={handleClickMenu}
      className="size-full bg-container transition-300 border-0!"
      selectedKeys={selectKey}
    />
  );
});

export default HorizontalMenu;
