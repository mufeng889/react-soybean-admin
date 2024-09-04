import { SimpleScrollbar } from '@sa/materials';
import type { Route, RouteRecordNormalized } from '@sa/simple-router';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { MenuProps } from 'antd';
import type { FC } from 'react';
import { getSiderCollapse } from '@/store/slice/app';
import { getThemeSettings } from '@/store/slice/theme';
import type { Props } from './HorizontalMenu';

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

function getSelectKey(route: Route) {
  const { hideInMenu, activeMenu } = route.meta;

  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}

const getSelectedMenuKeyPath = (matches: RouteRecordNormalized[]) => {
  const result = matches.reduce((acc: string[], match, index) => {
    if (index < matches.length - 1 && match.name) {
      acc.push(match.name);
    }
    return acc;
  }, []);

  return result;
};

const VerticalMenu: FC<Props> = memo(({ menus }) => {
  const route = useRoute();
  const levelKeys = getLevelKeys(menus as LevelKeysProps[]);

  const themeSettings = useAppSelector(getThemeSettings);

  const selectedKeys = getSelectKey(route);

  const router = useRouterPush();
  const matches = route.matched;
  const openKeys = () => {
    return getSelectedMenuKeyPath(matches);
  };

  const inlineCollapsed = useAppSelector(getSiderCollapse);

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
    <SimpleScrollbar>
      <AMenu
        mode="inline"
        items={menus}
        inlineCollapsed={inlineCollapsed}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        onSelect={handleClickMenu}
        className="size-full bg-container transition-300 border-0!"
        inlineIndent={18}
      />
    </SimpleScrollbar>
  );
});

export default VerticalMenu;
