import type { SubMenuType } from 'antd/es/menu/interface';
import { createPortal } from 'react-dom';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { Route } from '@sa/simple-router';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import FirstLevelMenu from '../components/FirstLevelMenu';
import { headerContainer, siderContainer } from './shared';

function getSelectKey(route: Route) {
  const { hideInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}

const HorizontalMixMenu = memo(() => {
  const route = useRoute();

  const menus = useMenu();

  const router = useRouterPush();

  const selectKey = getSelectKey(route);

  function handleClickMenu(menuInfo: MenuInfo) {
    router.menuPush(menuInfo.key);
  }

  const dispatch = useAppDispatch();

  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (!menu.children?.length) {
      router.routerPush({ name: menu.key });
    }
  }
  if (!headerContainer || !siderContainer) return null;
  console.log(siderContainer);

  return (
    <>
      {createPortal(
        <AMenu
          mode="horizontal"
          items={menus}
          inlineIndent={18}
          onSelect={handleClickMenu}
          selectedKeys={selectKey}
        />,
        headerContainer
      )}
      {createPortal(<FirstLevelMenu onSelect={handleSelectMixMenu} />, siderContainer)}
    </>
  );
});

export default HorizontalMixMenu;
