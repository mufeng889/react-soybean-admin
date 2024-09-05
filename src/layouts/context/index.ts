import { createContext } from 'react';

export interface MixMenuContextProps {
  activeFirstLevelMenuKey: string;
  setActiveFirstLevelMenuKey: (key: string) => void;
  firstLevelMenu: App.Global.Menu[];
  allMenus: App.Global.Menu[];
  childLevelMenus: App.Global.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
}

function voidFunc() {}

export const MixMenuContext = createContext<MixMenuContextProps>({
  activeFirstLevelMenuKey: '',
  setActiveFirstLevelMenuKey: voidFunc,
  firstLevelMenu: [],
  allMenus: [],
  childLevelMenus: [],
  isActiveFirstLevelMenuHasChildren: false
});
