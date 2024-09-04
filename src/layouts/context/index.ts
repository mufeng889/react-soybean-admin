import { createContext } from 'react';
import type { SubMenuType } from 'antd/es/menu/interface';

export interface MixMenuContextProps {
  activeFirstLevelMenuKey: string;
  setActiveFirstLevelMenuKey: (key: string) => void;
  firstLevelMenu: App.Global.Menu[];
  allMenus: SubMenuType[];
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
