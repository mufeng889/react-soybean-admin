import {useRoute} from '@sa/simple-router'
import type {RouteLocationNormalizedLoaded} from '@sa/simple-router'
import type { MenuInfo } from 'rc-menu/lib/interface';
import { headerContainer } from './shared';
import {useRouterPush} from '@/hooks/common/routerPush'



const HorizontalMenu = () => {
  if (!headerContainer) return null;

  const route = useRoute();

  console.log(route);


  const menus = useMenu();

  const router = useRouterPush();
  function getSelectKey(route:RouteLocationNormalizedLoaded)  {
    const { hideInMenu, activeMenu } = route.meta;
    const name = route.name as string;

    const routeName = (hideInMenu ? activeMenu : name) || name;

    return [routeName];
  };

  const selectKey=getSelectKey(route)

  function handleClickMenu(menuInfo: MenuInfo) {
    router.menuPush(menuInfo.key);
  }


  return <AMenu
   mode='horizontal'
   items={menus}
   inlineIndent={18}
   onSelect={handleClickMenu}
   selectedKeys={selectKey}
  />;
};

export default HorizontalMenu;
