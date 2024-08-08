import type { MenuProps } from 'antd';
import DarkModeContainer from '@/components/common/DarkModeContainer';
import ThemeSchemaSwitch from '@/components/common/ThemeSchemaSwitch';
import LangSwitch from '@/components/common/LangSwitch';
import FullScreen from '@/components/common/FullScreen';
import MenuToggler from '@/components/common/MenuToggler';
import GlobalLogo from '../global-logo';
import GlobalSearch from '../global-search';
import HorizontalMenu from '../global-menu/BaseMenu';
import GlobalBreadcrumb from '../global-breadcrumb';
import ThemeButton from './components/ThemeButton';
import UserAvatar from './components/UserAvatar';

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps['showLogo'];
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps['showMenuToggler'];
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps['showMenu'];
  childrenMenu: MenuProps['items'];
  menus: MenuProps['items'];
  isMobile: boolean;
  settings: App.Theme.ThemeSetting;
}
const GlobalHeader: FC<Props> = memo(
  ({ showLogo, showMenuToggler, showMenu, childrenMenu, menus, isMobile, settings }) => {
    const headerMenus = () => {
      if (settings.layout.mode === 'horizontal') {
        return menus;
      }

      if (settings.layout.mode === 'horizontal-mix') {
        return childrenMenu;
      }

      return [];
    };

    const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

    return (
      <DarkModeContainer className="h-full flex-y-center px-12px shadow-header">
        {showLogo && (
          <GlobalLogo
            className="h-full"
            style={{ width: `${settings.sider.width}px` }}
          />
        )}

        {showMenu ? (
          <HorizontalMenu
            menus={headerMenus()}
            mode="horizontal"
            className="px-12px"
          />
        ) : (
          <div className="h-full flex-y-center flex-1-hidden">
            {showMenuToggler && <MenuToggler />}
            {!isMobile && <GlobalBreadcrumb className="ml-12px" />}
          </div>
        )}
        <div className="h-full flex-y-center justify-end">
          <GlobalSearch />
          {!isMobile && (
            <FullScreen
              full={isFullscreen}
              toggleFullscreen={toggleFullscreen}
            />
          )}
          <LangSwitch />
          <ThemeSchemaSwitch />
          <ThemeButton />
          <UserAvatar />
        </div>
      </DarkModeContainer>
    );
  }
);

export default GlobalHeader;
