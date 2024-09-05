import { createPortal } from 'react-dom';
import type { SubMenuType } from 'antd/es/menu/interface';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import FirstLevelMenu from '../components/FirstLevelMenu';
import { useGetElementById } from './hook';
import Horizontal from './Horizontal';

const HorizontalMix = () => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

  const dispatch = useAppDispatch();

  const router = useRouterPush();

  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (!menu.children?.length) {
      router.routerPush({ name: menu.key });
    }
  }

  if (!container) return null;

  return [
    <Horizontal
      mode="2"
      key="horizontal"
    />,
    createPortal(
      <FirstLevelMenu
        key="first-level-menu"
        onSelect={handleSelectMixMenu}
      />,
      container
    )
  ];
};

export default HorizontalMix;
