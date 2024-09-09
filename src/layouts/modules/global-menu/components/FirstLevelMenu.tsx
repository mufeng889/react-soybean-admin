import { SimpleScrollbar } from '@sa/materials';
import ClassNames from 'classnames';
import { transformColorWithOpacity } from '@sa/color';
import { cloneElement } from 'react';
import type { RouteKey } from '@elegant-router/types';
import { getSiderCollapse } from '@/store/slice/app';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';

interface Props {
  inverted?: boolean;
  children?: React.ReactNode;
  onSelect?: () => void;
}

interface MixMenuItemProps {
  /** Menu item label */
  menu: App.Global.Menu;
  onClick?: () => void;
  /** Active menu item */
  active: boolean;
  inverted?: boolean;
  setActiveFirstLevelMenuKey: (key: string) => void;
}

function MixMenuItem(Props: MixMenuItemProps) {
  const {
    menu: { icon, label, key, children },
    active,
    inverted,
    onClick,
    setActiveFirstLevelMenuKey
  } = Props;

  const themeSettings = useAppSelector(getThemeSettings);

  const router = useRouterPush();

  function handleSelectMixMenu() {
    setActiveFirstLevelMenuKey(key);

    if (children?.length) {
      if (onClick) onClick();
    } else {
      router.routerPushByKeyWithMetaQuery(key as RouteKey);
    }
  }

  const darkMode = useAppSelector(getDarkMode);

  const siderCollapse = useAppSelector(getSiderCollapse);

  const selectedBgColor = useMemo(() => {
    const light = transformColorWithOpacity(themeSettings.themeColor, 0.1, '#ffffff');
    const dark = transformColorWithOpacity(themeSettings.themeColor, 0.3, '#000000');

    return darkMode ? dark : light;
  }, [darkMode, themeSettings.themeColor]);

  return (
    <div
      className={ClassNames(
        'mx-4px mb-6px flex-col-center cursor-pointer rounded-8px bg-transparent px-4px py-8px  transition-300 hover:bg-[rgb(0,0,0,0.08)] ',
        { 'text-primary selected-mix-menu': active },
        { 'text-white:65 hover:text-white': inverted },
        { '!text-white !bg-primary': active && inverted }
      )}
      onClick={handleSelectMixMenu}
      style={{ backgroundColor: active ? selectedBgColor : '' }}
    >
      {icon && cloneElement(icon, { className: siderCollapse ? 'text-icon-small' : 'text-icon-large' })}

      <p
        className={ClassNames(
          'w-full ellipsis-text text-12px text-center  transition-height-300',
          siderCollapse ? 'h-0 pt-0' : 'h-24px pt-4px'
        )}
      >
        {label}
      </p>
    </div>
  );
}

const FirstLevelMenu: FC<Props> = memo(({ children, inverted, onSelect }) => {
  const { allMenus, activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext();

  return (
    <div className="h-full flex-col-stretch flex-1-hidden">
      {children}
      <SimpleScrollbar>
        {allMenus.map(item => (
          <MixMenuItem
            key={item.key}
            onClick={onSelect}
            setActiveFirstLevelMenuKey={setActiveFirstLevelMenuKey}
            inverted={inverted}
            active={item.key === activeFirstLevelMenuKey}
            menu={item}
          />
        ))}
      </SimpleScrollbar>
      <MenuToggler
        arrowIcon
        className={ClassNames({ 'text-white:88 !hover:text-white': inverted })}
      />
    </div>
  );
});

export default FirstLevelMenu;
