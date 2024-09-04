import type { SubMenuType } from 'antd/es/menu/interface';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import VerticalMixMenu from './modules/VerticalMixMenu';
import HorizontalMenu from './modules/Horizontal';
import VerticalMenu from './modules/Vertical';
import FirstLevelMenu from './components/FirstLevelMenu';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
}

const GlobalMenu: FC<Props> = memo(({ mode }) => {
  const dispatch = useAppDispatch();

  const router = useRouterPush();
  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (!menu.children?.length) {
      router.routerPush({ name: menu.key });
    }
  }

  const componentsMap = {
    vertical: <VerticalMenu />,
    'vertical-mix': <VerticalMixMenu />,
    horizontal: <HorizontalMenu />,
    'horizontal-mix': [
      <HorizontalMenu key={1} />,
      <FirstLevelMenu
        key={2}
        onSelect={handleSelectMixMenu}
      />
    ]
  };

  return componentsMap[mode];
});

export default GlobalMenu;
