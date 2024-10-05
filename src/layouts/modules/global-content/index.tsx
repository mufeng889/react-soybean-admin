import './style.css';
import ClassNames from 'classnames';
import KeepAlive, { useKeepaliveRef } from 'keepalive-for-react';
import { getThemeSettings } from '@/store/slice/theme';
import { getReloadFlag } from '@/store/slice/app';
import { getRemoveCacheKey, selectCacheRoutes } from '@/store/slice/route';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const location = useLocation();

  const currentOutlet = useOutlet();

  const aliveRef = useKeepaliveRef();

  const removeCacheKey = useAppSelector(getRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  const themeSetting = useAppSelector(getThemeSettings);

  const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  const cacheKey = (location.pathname + location.search).slice(1).split('/').join('_');

  useUpdateEffect(() => {
    if (!aliveRef.current || !removeCacheKey) return;
    aliveRef.current.removeCache(removeCacheKey);
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload]);

  return (
    <div className={ClassNames('h-full flex-grow bg-layout', { 'p-16px': !closePadding })}>
      <KeepAlive
        aliveRef={aliveRef}
        activeName={cacheKey}
        cacheDivClassName={reload ? transitionName : ''}
        include={cacheKeys}
        strategy={'LRU'}
      >
        {currentOutlet}
      </KeepAlive>
    </div>
  );
});

export default GlobalContent;
