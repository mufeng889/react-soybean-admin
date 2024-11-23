import './style.css';
import ClassNames from 'classnames';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';

import { getReloadFlag } from '@/store/slice/app';
import { getRemoveCacheKey, selectCacheRoutes } from '@/store/slice/route';
import { getThemeSettings } from '@/store/slice/theme';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const useGetCacheKey = () => {
  const location = useLocation();

  const cacheKey = (location.pathname + location.search).slice(1).split('/').join('_');

  return cacheKey;
};

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const currentOutlet = useOutlet();

  const aliveRef = useKeepAliveRef();

  const removeCacheKey = useAppSelector(getRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  const cacheKey = useGetCacheKey();

  const themeSetting = useAppSelector(getThemeSettings);

  const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  useUpdateEffect(() => {
    if (!aliveRef.current || !removeCacheKey) return;

    aliveRef.current.destroy(removeCacheKey);
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload]);

  return (
    <div className={ClassNames('h-full flex-grow bg-layout', { 'p-16px': !closePadding })}>
      <KeepAlive
        activeCacheKey={cacheKey}
        aliveRef={aliveRef}
        cacheNodeClassName={reload ? transitionName : ''}
        include={cacheKeys}
      >
        {currentOutlet}
      </KeepAlive>
    </div>
  );
});

export default GlobalContent;
