import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LastLevelRouteKey, RouteKey } from '@elegant-router/types';
import type { RouteRecordNormalized } from '@sa/simple-router';
import { router } from '@/router';
import { localStg } from '@/utils/storage';
import { getThemeSettings } from '../theme';
import type { AppThunk } from '../../index';
import {
  extractTabsByAllRoutes,
  filterTabsById,
  filterTabsByIds,
  findTabByRouteName,
  getActiveFirstLevelMenuKey,
  getAllTabs,
  getDefaultHomeTab,
  getFixedTabIds,
  getTabByRoute,
  isTabInTabs
} from './shared';

interface InitialStateType {
  tabs: App.Global.Tab[];
  activeTabId: string;
  homeTab: App.Global.Tab | null;
  removeCacheKey: RouteKey | null;
  activeFirstLevelMenuKey: string;
}

const initialState: InitialStateType = {
  /** Tabs */
  tabs: [],
  /** Active tab id */
  activeTabId: '',
  /** Get active tab */
  homeTab: null,

  removeCacheKey: null,

  activeFirstLevelMenuKey: ''
};
export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    /**
     * Set active tab id
     *
     * @param id Tab id
     */
    setActiveTabId(state, { payload }: PayloadAction<string>) {
      state.activeTabId = payload;
    },
    /**
     * Add tab
     *
     * @param route Tab route
     * @param active Whether to activate the added tab
     */
    addTab(state, { payload }: PayloadAction<App.Global.Tab>) {
      state.tabs.push(payload);
    },
    changeTabLabel(state, { payload }: PayloadAction<{ label?: string; index: number }>) {
      const { label, index } = payload;

      if (label) {
        state.tabs[index].i18nKey = label;
      } else {
        state.tabs[index].i18nKey = state.tabs[index].oldLabel;
      }
    },
    setTabs(state, { payload }: PayloadAction<App.Global.Tab[]>) {
      state.tabs = payload;
    },
    setActiveFirstLevelMenuKey(state, { payload }: PayloadAction<string>) {
      state.activeFirstLevelMenuKey = payload;
    },

    initHomeTab(
      state,
      {
        payload
      }: PayloadAction<{
        route: RouteRecordNormalized | false;
        homeRouteName: LastLevelRouteKey;
      }>
    ) {
      state.homeTab = getDefaultHomeTab(payload);
    }
  },
  selectors: {
    getTabs: tab => tab.tabs,
    getActiveTabId: tab => tab.activeTabId,
    getHomeTab: tab => tab.homeTab,
    selectActiveFirstLevelMenuKey: tab => tab.activeFirstLevelMenuKey
  }
});

export const { addTab, initHomeTab, setTabs, setActiveTabId, setActiveFirstLevelMenuKey, changeTabLabel } =
  tabSlice.actions;

export const { getTabs, getHomeTab, getActiveTabId, selectActiveFirstLevelMenuKey } = tabSlice.selectors;

export const selectAllTabs = createSelector([getTabs, getHomeTab], (tabs, homeTab) => {
  const allTabs = getAllTabs(tabs, homeTab);
  return allTabs;
});

/**
 * Init tab store
 *
 * @param currentRoute Current route
 */
export const initTabStore = (): AppThunk => (dispatch, getState) => {
  const storageTabs = localStg.get('globalTabs');
  const themeSettings = getThemeSettings(getState());

  if (themeSettings.tab.cache && storageTabs) {
    const tabs = extractTabsByAllRoutes(router.getAllRouteNames(), storageTabs);
    dispatch(setTabs(tabs));
  }
};

/**
 * Remove tab
 *
 * @param tabId Tab id
 */
export const removeTab =
  (tabId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const activeTabId = getActiveTabId(getState());
    const tabs = getTabs(getState());
    const isRemoveActiveTab = activeTabId === tabId;
    const updatedTabs = filterTabsById(tabId, tabs);
    function update() {
      dispatch(setTabs(updatedTabs));
    }

    if (!isRemoveActiveTab) {
      update();
      return;
    }

    const homeTab = getHomeTab(getState());

    const activeTab = updatedTabs.at(-1) || homeTab;
    if (activeTab) {
      await switchRouteByTab(activeTab);
      update();
    }
  };

/** remove active tab */
export const removeActiveTab = (): AppThunk => (dispatch, getState) => {
  const activeTabId = getActiveTabId(getState());
  dispatch(removeTab(activeTabId));
};

/**
 * Add tab
 *
 * @param route Tab route
 * @param active Whether to activate the added tab
 */
export const addTabByRoute =
  (route: App.Global.TabRoute, active = true): AppThunk =>
  (dispatch, getState) => {
    const tab = getTabByRoute(route);

    const tabs = getTabs(getState());
    const isHomeTab = tab.id === getHomeTab(getState())?.id;

    if (!isHomeTab && !isTabInTabs(tab.id, tabs)) {
      dispatch(addTab(tab));
    }

    if (active) {
      dispatch(setActiveTabId(tab.id));

      const firstLevelRouteName = getActiveFirstLevelMenuKey(route);
      dispatch(setActiveFirstLevelMenuKey(firstLevelRouteName));
    }
  };

/**
 * Is tab retain
 *
 * @param tabId
 */
export const isTabRetain =
  (tabId: string): AppThunk<boolean> =>
  (_, getState) => {
    const homeTab = getHomeTab(getState());
    if (tabId === homeTab?.id) return true;
    const tabs = getTabs(getState());
    const fixedTabIds = getFixedTabIds(tabs);

    return fixedTabIds.includes(tabId);
  };

/** Cache tabs */
export const cacheTabs = (): AppThunk => (_, getState) => {
  const themeSettings = getThemeSettings(getState());
  if (!themeSettings.tab.cache) return;
  const tabs = getTabs(getState());

  localStg.set('globalTabs', tabs);
};

/**
 * Switch route by tab
 *
 * @param tab
 */
async function switchRouteByTab(tab: App.Global.Tab) {
  const fail = await router.push(tab.fullPath);
  if (!fail) {
    setActiveTabId(tab.id);
  }
}

/**
 * Clear tabs
 *
 * @param excludes Exclude tab ids
 */
export const clearTabs =
  (excludes: string[] = []): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const tabs = getTabs(getState());
    const remainTabIds = [...getFixedTabIds(tabs), ...excludes];
    const removedTabsIds = tabs.map(tab => tab.id).filter(id => !remainTabIds.includes(id));

    const activeTabId = getActiveTabId(getState());
    const isRemoveActiveTab = removedTabsIds.includes(activeTabId);
    const updatedTabs = filterTabsByIds(removedTabsIds, tabs);

    function update() {
      dispatch(setTabs(updatedTabs));
    }

    if (!isRemoveActiveTab) {
      update();
      return;
    }
    const homeTab = getHomeTab(getState());

    const activeTab = updatedTabs[updatedTabs.length - 1] || homeTab;
    await switchRouteByTab(activeTab);

    update();
  };

/**
 * Clear left tabs
 *
 * @param tabId
 */
export const clearLeftTabs =
  (tabId: string): AppThunk =>
  (dispatch, getState) => {
    const tabs = getTabs(getState());
    const tabIds = tabs.map(tab => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(index);
    dispatch(clearTabs(excludes));
  };

/**
 * remove tab by route name
 *
 * @param routeName route name
 */
export const removeTabByRouteName =
  (routeName: RouteKey): AppThunk =>
  (dispatch, getState) => {
    const tabs = getTabs(getState());
    const tab = findTabByRouteName(routeName, tabs);

    if (!tab) return;

    dispatch(removeTab(tab.id));
  };

/**
 * Clear right tabs
 *
 * @param tabId
 */
export const clearRightTabs =
  (tabId: string): AppThunk =>
  (dispatch, getState) => {
    const homeTab = getHomeTab(getState());
    const isHomeTab = tabId === homeTab?.id;

    if (isHomeTab) {
      dispatch(clearTabs());
      return;
    }

    const tabs = getTabs(getState());
    const tabIds = tabs.map(tab => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(0, index + 1);
    dispatch(clearTabs(excludes));
  };

/**
 * Set new label of tab
 *
 * @default activeTabId
 * @param label New tab label
 * @param tabId Tab id
 */
export const setTabLabel =
  (label: string, tabId?: string): AppThunk =>
  (dispatch, getState) => {
    const activeTabId = getActiveTabId(getState());
    const tabs = getTabs(getState());
    const id = tabId || activeTabId;
    const tab = tabs.findIndex(item => item.id === id);

    if (tab < 0) return;

    dispatch(changeTabLabel({ label, index: tab }));
  };

/**
 * Reset tab label
 *
 * @default activeTabId
 * @param tabId Tab id
 */
export const resetTabLabel =
  (tabId?: string): AppThunk =>
  (dispatch, getState) => {
    const activeTabId = getActiveTabId(getState());
    const tabs = getTabs(getState());
    const id = tabId || activeTabId;

    const tab = tabs.findIndex(item => item.id === id);
    if (tab < 0) return;

    dispatch(changeTabLabel({ index: tab }));
  };
