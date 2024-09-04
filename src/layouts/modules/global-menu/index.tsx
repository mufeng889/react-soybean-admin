import type { MenuProps } from 'antd';
import type { SubMenuType } from 'antd/es/menu/interface';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import VerticalMixMenu from './modules/VerticalMixMenu';
import HorizontalMenu from './modules/HorizontalMenu';
import VerticalMenu from './modules/VerticalMenu';
import FirstLevelMenu from './components/FirstLevelMenu';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
  menus: MenuProps['items'];
  childrenMenu: MenuProps['items'];
}

const GlobalMenu: FC<Props> = memo(({ mode, menus, childrenMenu }) => {
  const dispatch = useAppDispatch();

  const router = useRouterPush();
  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (!menu.children?.length) {
      router.routerPush({ name: menu.key });
    }
  }

  const componentsMap = {
    vertical: <VerticalMenu menus={menus} />,
    'vertical-mix': <VerticalMixMenu menus={childrenMenu} />,
    horizontal: <HorizontalMenu menus={menus} />,
    'horizontal-mix': [
      <HorizontalMenu
        key={1}
        menus={childrenMenu}
      />,
      <FirstLevelMenu
        key={2}
        onSelect={handleSelectMixMenu}
      />
    ]
  };

  return componentsMap[mode];
});

export default GlobalMenu;
