import { createPortal } from 'react-dom';
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import HorizontalMenu from '../components/HorizontalMenu';
import type { Props } from '../components/HorizontalMenu';
import { useGetElementById } from './hook';

const Horizontal = ({ menus }: Props) => {
  const container = useGetElementById(GLOBAL_HEADER_MENU_ID);

  if (!container) return null;

  return createPortal(<HorizontalMenu menus={menus} />, container);
};

export default Horizontal;
