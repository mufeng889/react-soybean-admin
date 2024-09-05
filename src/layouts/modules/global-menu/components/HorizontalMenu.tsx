import type { Route } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { FC } from 'react';
import { useRouterPush } from '@/hooks/common/routerPush';

interface Props {
  mode: '1' | '2' | '3';
}

function getSelectKey(route: Route) {
  const { hideInMenu, activeMenu } = route.meta;

  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}

const HorizontalMenu: FC<Props> = memo(({ mode }) => {
  const route = useRoute();

  const { allMenus, childLevelMenus, firstLevelMenu } = useMixMenuContext();

  const menus = new Map([
    ['1', allMenus as any],
    ['2', childLevelMenus],
    ['3', firstLevelMenu]
  ]);

  const router = useRouterPush();

  const selectKey = getSelectKey(route);

  function handleClickMenu(menuInfo: MenuInfo) {
    router.menuPush(menuInfo.key);
  }

  return (
    <AMenu
      mode="horizontal"
      items={menus.get(mode)}
      inlineIndent={18}
      onSelect={handleClickMenu}
      className="size-full bg-container transition-400 border-0!"
      selectedKeys={selectKey}
    />
  );
});

export default HorizontalMenu;
