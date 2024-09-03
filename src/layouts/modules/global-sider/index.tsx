import DarkModeContainer from '@/components/stateless/common/DarkModeContainer.tsx';
import { getDarkMode } from '@/store/slice/theme';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import GlobalLogo from '../global-logo';

interface Props {
  headerHeight: number;
  isVerticalMix: boolean;
  isHorizontalMix: boolean;
  siderCollapse: boolean;
  inverted: boolean;
}

const GlobalSider: FC<Props> = memo(({ headerHeight, isHorizontalMix, isVerticalMix, siderCollapse, inverted }) => {
  const darkMode = useAppSelector(getDarkMode);

  const showLogo = !isVerticalMix && !isHorizontalMix;

  const darkMenu = !darkMode && !isHorizontalMix && inverted;

  return (
    <DarkModeContainer
      className="size-full flex-col-stretch shadow-sider"
      inverted={darkMenu}
    >
      {showLogo && (
        <GlobalLogo
          showTitle={!siderCollapse}
          style={{ height: `${headerHeight}px` }}
        />
      )}
      <div
        id={GLOBAL_SIDER_MENU_ID}
        className={showLogo ? 'flex-1-hidden' : 'h-full'}
      />
    </DarkModeContainer>
  );
});

export default GlobalSider;
