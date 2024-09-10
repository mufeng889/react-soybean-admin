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
  isMobile: boolean;
  mode: UnionKey.ThemeLayoutMode;
  siderWidth: number;
  reverse?: boolean;
}

const HEADER_PROPS_CONFIG: Record<UnionKey.ThemeLayoutMode, App.Global.HeaderProps> = {
  vertical: {
    showLogo: false,
    showMenu: false,
    showMenuToggler: true
  },
  'vertical-mix': {
    showLogo: false,
    showMenu: false,
    showMenuToggler: false
  },
  horizontal: {
    showLogo: true,
    showMenu: true,
    showMenuToggler: false
  },
  'horizontal-mix': {
    showLogo: true,
    showMenu: true,
    showMenuToggler: false
  }
};

const GlobalHeader: FC<Props> = memo(({ mode, isMobile, siderWidth, reverse }) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  const { showLogo, showMenu, showMenuToggler } = HEADER_PROPS_CONFIG[mode];

  const showToggler = reverse ? true : showMenuToggler;

  return (
    <DarkModeContainer className="h-full flex-y-center px-12px shadow-header">
      {showLogo && (
        <GlobalLogo
          className="h-full"
          style={{ width: `${siderWidth}px` }}
        />
      )}
      <div>{reverse ? true : showMenuToggler}</div>

      {showToggler && <MenuToggler />}

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
