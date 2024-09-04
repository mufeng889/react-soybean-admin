import { createPortal } from 'react-dom';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import VerticalMenu from '../components/VerticalMenu';
import type { Props } from '../components/HorizontalMenu';
import { useGetElementById } from './hook';

const Vertical = ({ menus }: Props) => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

  if (!container) return null;

  return createPortal(<VerticalMenu menus={menus} />, container);
};

export default Vertical;
