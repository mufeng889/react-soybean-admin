import type { Route } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRouterPush } from '@/hooks/common/routerPush';

function getSelectKey(route: Route) {
  const { hideInMenu, activeMenu } = route.meta;

  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}

const HorizontalMenu = () => {
  const route = useRoute();

  const menus = useMenu();

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
      selectedKeys={selectKey}
    />
  );
};

export default HorizontalMenu;
