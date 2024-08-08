import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setLng } from '@/locales';
import { localStg } from '@/utils/storage';
import type { AppThunk } from '../../index';
import { getThemeSettings } from '../theme';
interface InitialStateType {
  localeOptions: App.I18n.LangOption[];
  locale: App.I18n.LangType;
  themeDrawerVisible: boolean;
  reloadFlag: boolean;
  fullContent: boolean;
  contentXScrollable: boolean;
  siderCollapse: boolean;
  mixSiderFixed: boolean;
  isMobile: boolean;
}

const initialState: InitialStateType = {
  localeOptions: [
    {
      label: '中文',
      key: 'zh-CN'
    },
    {
      label: 'English',
      key: 'en-US'
    }
  ],
  locale: localStg.get('lang') || 'zh-CN',
  themeDrawerVisible: false,
  reloadFlag: true,
  fullContent: false,
  contentXScrollable: false,
  siderCollapse: false,
  mixSiderFixed: false,
  /** Is mobile layout */
  isMobile: false
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLocale(state, { payload }: PayloadAction<App.I18n.LangType>) {
      state.locale = payload;
      setLng(payload);
      localStg.set('lang', payload);
    },
    openThemeDrawer: state => {
      state.themeDrawerVisible = true;
    },
    closeThemeDrawer: state => {
      state.themeDrawerVisible = false;
    },
    setReloadFlag: (state, action: PayloadAction<boolean>) => {
      state.reloadFlag = action.payload;
    },
    toggleFullContent: state => {
      state.fullContent = !state.fullContent;
    },
    setContentXScrollable: (state, action: PayloadAction<boolean>) => {
      state.contentXScrollable = action.payload;
    },
    setSiderCollapse: (state, { payload }: PayloadAction<boolean>) => {
      state.siderCollapse = payload;
    },
    toggleSiderCollapse: state => {
      state.siderCollapse = !state.siderCollapse;
    },
    setMixSiderFixed: (state, action: PayloadAction<boolean>) => {
      state.mixSiderFixed = action.payload;
    },
    toggleMixSiderFixed: state => {
      state.mixSiderFixed = !state.mixSiderFixed;
    },
    setIsMobile: (state, { payload }: { payload: boolean }) => {
      state.isMobile = payload;
    }
  },
  selectors: {
    getLocale: app => app.locale,
    getLocaleOptions: app => app.localeOptions,
    getThemeDrawerVisible: app => app.themeDrawerVisible,
    getReloadFlag: app => app.reloadFlag,
    getFullContent: app => app.fullContent,
    getContentXScrollable: app => app.contentXScrollable,
    getSiderCollapse: app => app.siderCollapse,
    getMixSiderFixed: app => app.mixSiderFixed,
    getIsMobile: app => app.isMobile
  }
});
// Action creators are generated for each case reducer function.
export const {
  changeLocale,
  openThemeDrawer,
  closeThemeDrawer,
  setReloadFlag,
  toggleFullContent,
  setContentXScrollable,
  setSiderCollapse,
  toggleSiderCollapse,
  setMixSiderFixed,
  toggleMixSiderFixed,
  setIsMobile
} = appSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  getLocale,
  getMixSiderFixed,
  getSiderCollapse,
  getLocaleOptions,
  getContentXScrollable,
  getFullContent,
  getThemeDrawerVisible,
  getReloadFlag,
  getIsMobile
} = appSlice.selectors;

/**
 * Reload page
 *
 * @param duration Duration time
 */
export const reloadPage =
  (duration = 300): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setReloadFlag(false));

    const themeSettings = getThemeSettings(getState());
    const d = themeSettings.page.animate ? duration : 40;

    await new Promise(resolve => {
      setTimeout(resolve, d);
    });

    dispatch(setReloadFlag(true));
  };
