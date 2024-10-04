import './style.css';
import ClassNames from 'classnames';
import KeepAlive from 'keepalive-for-react';
import { getThemeSettings } from '@/store/slice/theme';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const location = useLocation();

  const currentOutlet = useOutlet();

  const themeSetting = useAppSelector(getThemeSettings);

  const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  const cacheKey = location.pathname + location.search;

  return (
    <div className={ClassNames('h-full flex-grow bg-layout page ', { 'p-16px': !closePadding })}>
      <KeepAlive
        activeName={cacheKey}
        cacheDivClassName={transitionName}
        max={10}
        exclude={[/\/exclude-counter/]}
        strategy={'LRU'}
      >
        {currentOutlet}
      </KeepAlive>
    </div>
  );
});

export default GlobalContent;
