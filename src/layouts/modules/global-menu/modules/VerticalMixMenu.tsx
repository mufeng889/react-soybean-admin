import type { SubMenuType } from 'antd/es/menu/interface';
import type { MenuProps } from 'antd';
import classNames from 'classnames';
import { useRoute, useRouter } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { SimpleScrollbar } from '@sa/materials';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';
import { getMixSiderFixed, getSiderCollapse, toggleMixSiderFixed } from '@/store/slice/app';
import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import PinToggler from '@/components/stateless/common/PinToggler';
import { getActiveFirstLevelMenuKey } from '@/store/slice/tab/shared';
import FirstLevelMenu from '../components/FirstLevelMenu';

interface Props {
  menus: MenuProps['items'];
  children?: React.ReactNode;
}

const VerticalMixMenu: FC<Props> = memo(({ menus, children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const routerPush = useRouterPush();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(getDarkMode);
  const themeSettings = useAppSelector(getThemeSettings);
  const mixSiderFixed = useAppSelector(getMixSiderFixed);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const siderInverted = !darkMode && themeSettings.sider.inverted;
  const hasMenus = menus && menus.length > 0;
  const showDrawer = hasMenus && (drawerVisible || mixSiderFixed);
  const route = useRoute();

  const matches = route.matched;
  const collapse = useAppSelector(getSiderCollapse);

  const siderCollapse = themeSettings.layout.mode === 'vertical' && collapse;
  const selectedKeys = () => {
    const lastElement = matches[matches.length - 1];

    const { hideInMenu, activeMenu } = lastElement.meta;
    const name = lastElement.name as string;

    const routeName = (hideInMenu ? activeMenu : name) || name;

    return [routeName];
  };

  function handleClickMenu(menuInfo: MenuInfo) {
    routerPush.menuPush(menuInfo.key);
  }

  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (menu.children?.length) {
      setDrawerVisible(true);
    } else {
      router.push({ name: menu.key });
    }
  }
  function handleResetActiveMenu() {
    const firstLevelRouteName = getActiveFirstLevelMenuKey(router.currentRoute);
    dispatch(setActiveFirstLevelMenuKey(firstLevelRouteName));
    setDrawerVisible(false);
  }
  return (
    <div
      className="h-full flex"
      onMouseLeave={handleResetActiveMenu}
    >
      <FirstLevelMenu
        inverted={siderInverted}
        onSelect={handleSelectMixMenu}
      >
        {children}
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
          <SimpleScrollbar>
            <AMenu
              v-model:expanded-keys="expandedKeys"
              mode="vertical"
              selectedKeys={selectedKeys()}
              items={menus}
              inlineCollapsed={siderCollapse}
              inlineIndent={18}
              onSelect={handleClickMenu}
            />
          </SimpleScrollbar>
        </DarkModeContainer>
      </div>
    </div>
  );
});

export default VerticalMixMenu;
