import { createPortal } from 'react-dom';

import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';

import VerticalMenu from '../components/VerticalMenu';

import { useGetElementById } from './hook';

const Vertical = () => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

  if (!container) return null;

  return createPortal(<VerticalMenu />, container);
};

export default Vertical;
