import { createPortal } from 'react-dom';

import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';

import HorizontalMenu from '../components/HorizontalMenu';

import { useGetElementById } from './hook';

const Horizontal = ({ mode = '1' }: { readonly mode?: '1' | '2' | '3' }) => {
  const container = useGetElementById(GLOBAL_HEADER_MENU_ID);

  if (!container) return null;

  return createPortal(<HorizontalMenu mode={mode} />, container);
};

export default Horizontal;
