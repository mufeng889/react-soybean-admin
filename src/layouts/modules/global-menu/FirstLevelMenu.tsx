import { SimpleScrollbar } from '@sa/materials';
import ClassNames from 'classnames';
import { transformColorWithOpacity } from '@sa/color';
import type { SubMenuType } from 'antd/es/menu/interface';
import { cloneElement } from 'react';
import { getSiderCollapse } from '@/store/slice/app';
import MenuToggler from '@/components/common/MenuToggler';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';
import { selectActiveFirstLevelMenuKey } from '@/store/slice/tab';
interface Props {
  inverted?: boolean;
  children?: React.ReactNode;
  onSelect: (menu: SubMenuType) => void;
}
interface MixMenuItemProps {
  /** Menu item label */
  label: React.ReactNode;
  /** Menu item icon */
  Icon: React.ReactNode;
  /** Active menu item */
  active: boolean;
  /** Mini size */
  isMini: boolean;
  inverted?: boolean;
  onClick: () => void;
}
function MixMenuItem({ label, Icon, active, isMini, inverted, onClick }: MixMenuItemProps) {
  const themeSettings = useAppSelector(getThemeSettings);
  const darkMode = useAppSelector(getDarkMode);
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
      onClick={onClick}
      style={{ backgroundColor: active ? selectedBgColor : '' }}
    >
      {Icon && cloneElement(Icon as React.ReactElement, { className: isMini ? 'text-icon-small' : 'text-icon-large' })}

      <p
        className={ClassNames(
          'w-full ellipsis-text text-12px text-center  transition-height-300',
          isMini ? 'h-0 pt-0' : 'h-24px pt-4px'
        )}
      >
        {label}
      </p>
    </div>
  );
}

const FirstLevelMenu: FC<Props> = memo(({ children, inverted, onSelect }) => {
  const menus = useMenu();

  const siderCollapse = useAppSelector(getSiderCollapse);
  const activeMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);
  return (
    <div className="h-full flex-col-stretch flex-1-hidden">
      {children}
      <SimpleScrollbar>
        {menus.map(item => (
          <MixMenuItem
            onClick={() => onSelect(item)}
            isMini={siderCollapse}
            active={item.key === activeMenuKey}
            Icon={item.icon}
            label={item.label}
            key={item?.key}
          ></MixMenuItem>
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
