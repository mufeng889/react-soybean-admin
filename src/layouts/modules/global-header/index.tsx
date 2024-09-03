import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';
import ThemeSchemaSwitch from '@/components/stateful/ThemeSchemaSwitch';
import LangSwitch from '@/components/stateful/LangSwitch';
import FullScreen from '@/components/stateless/common/FullScreen';
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app';
import GlobalLogo from '../global-logo';
import GlobalSearch from '../global-search';
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
  isMobile: boolean;
  settings: App.Theme.ThemeSetting;
}

const GlobalHeader: FC<Props> = memo(({ showLogo, showMenuToggler, showMenu, isMobile, settings }) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <DarkModeContainer className="h-full flex-y-center px-12px shadow-header">
      {showLogo && (
        <GlobalLogo
          className="h-full"
          style={{ width: `${settings.sider.width}px` }}
        />
      )}
      {showMenuToggler && <MenuToggler />}

      <div
        id={GLOBAL_HEADER_MENU_ID}
        className="h-full flex-y-center flex-1-hidden"
      >
        {!isMobile && !showMenu && <GlobalBreadcrumb className="ml-12px" />}
      </div>

      <div className="h-full flex-y-center justify-end">
        <GlobalSearch />
        {!isMobile && (
          <FullScreen
            className="px-12px"
            full={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        )}
        <LangSwitch className="px-12px" />
        <ThemeSchemaSwitch className="px-12px" />
        <ThemeButton />
        <UserAvatar />
      </div>
    </DarkModeContainer>
  );
});

export default GlobalHeader;
