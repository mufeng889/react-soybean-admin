import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { getSortRoutes } from '@/store/slice/route';
import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import { MixMenuContext } from '../context';
import { getGlobalMenusByAuthRoutes } from './MenuUtil';

interface Props {
  children: ReactNode;
}

const MenuProvider: FC<Props> = ({ children }) => {
  const sortRoutes = useAppSelector(getSortRoutes);
  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);
  const dispatch = useAppDispatch();

  const changeActiveFirstLevelMenuKey = (key: string) => dispatch(setActiveFirstLevelMenuKey(key));

  const menus = getGlobalMenusByAuthRoutes(sortRoutes);

  const firstLevelMenu = useMemo(
    () =>
      menus.map(menu => {
        const { children: _, ...rest } = menu;
        return rest;
      }) as App.Global.Menu[],
    [menus]
  );

  const childLevelMenus = useMemo(
    () => menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[],
    [activeFirstLevelMenuKey, menus]
  );

  const mixMenuContext = {
    allMenus: menus,
    activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey,
    firstLevelMenu,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(activeFirstLevelMenuKey) : false,
    childLevelMenus: childLevelMenus || []
  };

  return <MixMenuContext.Provider value={mixMenuContext}>{children}</MixMenuContext.Provider>;
};

export default MenuProvider;
