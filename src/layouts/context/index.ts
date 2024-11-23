import type { Route } from '@sa/simple-router';
import { createContext } from 'react';

export interface MixMenuContextProps {
  activeFirstLevelMenuKey: string;
  allMenus: App.Global.Menu[];
  childLevelMenus: App.Global.Menu[];
  firstLevelMenu: App.Global.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
  route: Route;
  selectKey: string[];
  setActiveFirstLevelMenuKey: (key?: string) => void;
}

function voidFunc() {}

export const MixMenuContext = createContext<MixMenuContextProps>({
  activeFirstLevelMenuKey: '',
  allMenus: [],
  childLevelMenus: [],
  firstLevelMenu: [],
  isActiveFirstLevelMenuHasChildren: false,
  route: {} as Route,
  selectKey: [],
  setActiveFirstLevelMenuKey: voidFunc
});
