import type { MenuInfo } from 'rc-menu/lib/interface';
import type { FC } from 'react';
import { useRouterPush } from '@/hooks/common/routerPush';
import { getThemeSettings } from '@/store/slice/theme';

interface Props {
  mode: '1' | '2' | '3';
}

function isHasChildren(menus: App.Global.Menu[], key: string) {
  return menus.some(item => item.key === key && item.children?.length);
}

const HorizontalMenu: FC<Props> = memo(({ mode }) => {
  const themeSettings = useAppSelector(getThemeSettings);

  const { allMenus, childLevelMenus, firstLevelMenu, selectKey, setActiveFirstLevelMenuKey } = useMixMenuContext();

  const menus = new Map<Props['mode'], App.Global.Menu[]>([
    ['1', allMenus],
    ['2', childLevelMenus],
    ['3', firstLevelMenu]
  ]);

  const router = useRouterPush();

  function handleClickMenu(menuInfo: MenuInfo) {
    if (mode === '3' && isHasChildren(allMenus, menuInfo.key)) {
      setActiveFirstLevelMenuKey(menuInfo.key);
    } else {
      router.routerPushByKeyWithMetaQuery(menuInfo.key);
    }
  }

  return (
    <AMenu
      mode="horizontal"
      items={menus.get(mode)}
      inlineIndent={18}
      onSelect={handleClickMenu}
      style={{ lineHeight: `${themeSettings.header.height}px` }}
      className="size-full transition-400 border-0!"
      selectedKeys={selectKey}
    />
  );
});

export default HorizontalMenu;
