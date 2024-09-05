import type { SubMenuType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { useRouter } from '@sa/simple-router';
import { createPortal } from 'react-dom';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';
import { getMixSiderFixed, toggleMixSiderFixed } from '@/store/slice/app';
import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import PinToggler from '@/components/stateless/common/PinToggler';
import { getActiveFirstLevelMenuKey } from '@/store/slice/tab/shared';
import FirstLevelMenu from '../components/FirstLevelMenu';
import GlobalLogo from '../../global-logo';
import VerticalMenu from '../components/VerticalMenu';
import { useGetElementById } from './hook';

const VerticalMix = memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const { allMenus: menus } = useMixMenuContext();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(getDarkMode);
  const themeSettings = useAppSelector(getThemeSettings);
  const mixSiderFixed = useAppSelector(getMixSiderFixed);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const siderInverted = !darkMode && themeSettings.sider.inverted;
  const hasMenus = menus && menus.length > 0;
  const showDrawer = hasMenus && (drawerVisible || mixSiderFixed);

  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (menu.children?.length) {
      setDrawerVisible(true);
    } else {
      router.push({ name: menu.key });
    }
  }
  function handleResetActiveMenu() {
    setDrawerVisible(false);
    const firstLevelRouteName = getActiveFirstLevelMenuKey(router.currentRoute);
    dispatch(setActiveFirstLevelMenuKey(firstLevelRouteName));
  }

  return (
    <div
      className="h-full flex"
      onMouseLeave={handleResetActiveMenu}
    >
      <FirstLevelMenu
        inverted={siderInverted}
        onSelect={handleSelectMixMenu as any}
      >
        <GlobalLogo
          showTitle={false}
          style={{ height: `${themeSettings.header.height}px` }}
        />
      </FirstLevelMenu>
      <div
        className="relative h-full transition-width-300"
        style={{ width: mixSiderFixed && hasMenus ? `${themeSettings.sider.mixChildMenuWidth}px` : '0px' }}
      >
        <DarkModeContainer
          className="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-all-300"
          inverted={siderInverted}
          style={{ width: showDrawer ? `${themeSettings.sider.mixChildMenuWidth}px` : '0px' }}
        >
          <header
            className="flex-y-center justify-between px-12px"
            style={{ height: `${themeSettings.header.height}px` }}
          >
            <h2 className="text-16px text-primary font-bold">{t('system.title')}</h2>
            <PinToggler
              className={classNames({ 'text-white:88 !hover:text-white': siderInverted })}
              onClick={() => dispatch(toggleMixSiderFixed())}
              pin={mixSiderFixed}
            />
          </header>
          <VerticalMenu />
        </DarkModeContainer>
      </div>
    </div>
  );
});

const VerticalMixMenu = () => {
  const container = useGetElementById(GLOBAL_SIDER_MENU_ID);
  if (!container) return null;
  return createPortal(<VerticalMix />, container);
};

export default VerticalMixMenu;
