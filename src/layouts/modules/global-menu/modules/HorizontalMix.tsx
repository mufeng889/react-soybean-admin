import { createPortal } from 'react-dom';

import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';

import FirstLevelMenu from '../components/FirstLevelMenu';
import { useGetElementById } from './hook';
import Horizontal from './Horizontal';

const HorizontalMix = () => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

  if (!container) return null;

  return [
    <Horizontal
      mode="2"
      key="horizontal"
    />,
    createPortal(<FirstLevelMenu key="first-level-menu" />, container)
  ];
};

export default HorizontalMix;
