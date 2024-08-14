import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { SimpleScrollbar } from '@sa/materials';
import { useRoute } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import ClassNames from 'classnames';
import type { RouteRecordNormalized } from '@sa/simple-router';
import { getThemeSettings } from '@/store/slice/theme';
import { getSiderCollapse } from '@/store/slice/app';

interface Props {
  mode?: MenuProps['mode'];
  menus: MenuProps['items'];
  darkTheme?: boolean;
  className?: string;
}

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const getSelectedMenuKeyPath = (matches: RouteRecordNormalized[]) => {
  const result = matches.reduce((acc: string[], match, index) => {
    if (index < matches.length - 1 && match.name) {
      acc.push(match.name);
    }
    return acc;
  }, []);

  return result;
};

const BaseMenu: FC<Props> = memo(({ mode = 'inline', menus, darkTheme, className }) => {
  const themeSettings = useAppSelector(getThemeSettings);
  const collapse = useAppSelector(getSiderCollapse);
  const router = useRouterPush();
  const route = useRoute();

  const matches = route.matched;
  const levelKeys = getLevelKeys(menus as LevelKeysProps[]);

  const isHorizontal = mode === 'horizontal';
  const siderCollapse = themeSettings.layout.mode === 'vertical' && collapse;
  const inlineCollapsed = mode === 'inline' ? siderCollapse : undefined;

  const selectedKeys = () => {
    const lastElement = matches[matches.length - 1];

    const { hideInMenu, activeMenu } = lastElement.meta;
    const name = lastElement.name as string;

    const routeName = (hideInMenu ? activeMenu : name) || name;

    return [routeName];
  };
  const openKeys = () => {
    if (isHorizontal || inlineCollapsed) return [];

    return getSelectedMenuKeyPath(matches);
  };
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(openKeys());

  function handleClickMenu(menuInfo: MenuInfo) {
    router.menuPush(menuInfo.key);
  }

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    if (keys.includes('rc-menu-more')) {
      setStateOpenKeys(keys);
      return;
    }

    const currentOpenKey = keys.find(key => !stateOpenKeys.includes(key));

    // open
    if (currentOpenKey && themeSettings.isOnlyExpandCurrentParentMenu) {
      const repeatIndex = keys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        keys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(keys);
    }
  };

  return (
    <SimpleScrollbar className={className}>
      <Menu
        mode={mode}
        items={menus}
        theme={darkTheme ? 'dark' : 'light'}
        selectedKeys={selectedKeys()}
        openKeys={stateOpenKeys}
        inlineCollapsed={inlineCollapsed}
        onOpenChange={onOpenChange}
        inlineIndent={18}
        className={ClassNames('size-full transition-300 border-0!', {
          'bg-container ': !darkTheme,
          'horizontal-menu': isHorizontal
        })}
        onClick={handleClickMenu}
      ></Menu>
    </SimpleScrollbar>
  );
});

export default BaseMenu;
