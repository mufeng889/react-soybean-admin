import type { MenuProps } from 'antd';
import { createPortal } from 'react-dom';
import { GLOBAL_HEADER_MENU_ID, GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import VerticalMixMenu from './modules/VerticalMixMenu';
import HorizontalMenu from './modules/HorizontalMenu';
import HorizontalMixMenu from './modules/HorizontalMixMenu';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
  menus: MenuProps['items'];
}

const headerContainer = document.getElementById(GLOBAL_HEADER_MENU_ID);

const siderContainer = document.getElementById(GLOBAL_SIDER_MENU_ID);

const GlobalMenu: FC<Props> = memo(({ mode, menus }) => {
  if (!headerContainer || !siderContainer) return null;

  const componentsMap = {
    vertical: createPortal(<VerticalMixMenu menus={menus} />, siderContainer),
    'vertical-mix': <VerticalMixMenu menus={menus} />,
    horizontal: createPortal(<HorizontalMenu />, headerContainer),
    'horizontal-mix': <HorizontalMixMenu />
  };

  return componentsMap[mode];
});

export default GlobalMenu;
