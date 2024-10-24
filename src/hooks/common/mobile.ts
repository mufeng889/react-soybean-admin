import { getIsMobile } from '@/store/slice/app';

export function useMobile() {
  const isMobile = useAppSelector(getIsMobile);

  return isMobile;
}
