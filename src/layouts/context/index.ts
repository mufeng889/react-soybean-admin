import { createContext } from 'react';
import type { Route } from '@sa/simple-router';

export interface MixMenuContextProps {
  activeFirstLevelMenuKey: string;
  setActiveFirstLevelMenuKey: (key?: string) => void;
  firstLevelMenu: App.Global.Menu[];
  allMenus: App.Global.Menu[];
  childLevelMenus: App.Global.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
  selectKey: string[];
  route: Route;
}

function voidFunc() {}

export const MixMenuContext = createContext<MixMenuContextProps>({
  activeFirstLevelMenuKey: '',
  setActiveFirstLevelMenuKey: voidFunc,
  firstLevelMenu: [],
  allMenus: [],
  childLevelMenus: [],
  isActiveFirstLevelMenuHasChildren: false,
  selectKey: [],
  route: {} as Route
});
