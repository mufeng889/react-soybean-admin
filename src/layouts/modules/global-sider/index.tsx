import type { MenuProps } from 'antd';
import DarkModeContainer from '@/components/common/DarkModeContainer';
import { getDarkMode } from '@/store/slice/theme';
import GlobalLogo from '../global-logo';
import VerticalMenu from '../global-menu/BaseMenu.tsx';
import HorizontalMixMenu from '../global-menu/HorizontalMixMenu.tsx';
import VerticalMixMenu from '../global-menu/VerticalMixMenu.tsx';
interface Props {
  headerHeight: number;
  menus: MenuProps['items'];
  childrenMenus: MenuProps['items'];
  isVerticalMix: boolean;
  isHorizontalMix: boolean;
  siderCollapse: boolean;
  isVertical: boolean;
  themeSetting: App.Theme.ThemeSetting;
}
const GlobalSider: FC<Props> = memo(
  ({ headerHeight, menus, childrenMenus, isHorizontalMix, isVerticalMix, siderCollapse, isVertical, themeSetting }) => {
    const darkMode = useAppSelector(getDarkMode);

    const showLogo = !isVerticalMix && !isHorizontalMix;
    const darkMenu = !darkMode && !isHorizontalMix && themeSetting.sider.inverted;

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
        {isVerticalMix && (
          <VerticalMixMenu menus={childrenMenus}>
            <GlobalLogo
              showTitle={false}
              style={{ height: `${headerHeight}px` }}
            />
          </VerticalMixMenu>
        )}
        {isHorizontalMix && <HorizontalMixMenu />}

        {isVertical && (
          <VerticalMenu
            menus={menus}
            darkTheme={darkMenu}
          />
        )}
      </DarkModeContainer>
    );
  }
);

export default GlobalSider;
