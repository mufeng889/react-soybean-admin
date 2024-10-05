import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getPaletteColorByNumber } from '@sa/color';
import { localStg } from '@/utils/storage';
import type { AppThunk } from '../../index';
import { initThemeSettings, toggleAuxiliaryColorModes, toggleGrayscaleMode, updateDarkMode } from './shared';

interface InitialStateType {
  settings: App.Theme.ThemeSetting;
  darkMode: boolean;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>;
};

const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto'];

const initialState: InitialStateType = {
  settings: initThemeSettings(),
  darkMode: false
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      state.darkMode = payload;
    },

    /**
     * Set theme scheme
     *
     * @param themeScheme
     */
    setThemeScheme(state, { payload }: PayloadAction<UnionKey.ThemeScheme>) {
      state.darkMode = updateDarkMode(payload);
      state.settings.themeScheme = payload;
    },
    setSiderInverted(state, { payload }: PayloadAction<boolean>) {
      state.settings.sider.inverted = payload;
    },
    /**
     * Set grayscale value
     *
     * @param isGrayscale
     */
    setGrayscale(state, { payload }: PayloadAction<boolean>) {
      toggleGrayscaleMode(payload);
      state.settings.grayscale = payload;
    },
    setRecommendColor(state, { payload }: PayloadAction<boolean>) {
      state.settings.recommendColor = payload;
    },
    /**
     * Set colourWeakness value
     *
     * @param isColourWeakness
     */
    setColourWeakness(state, { payload }: PayloadAction<boolean>) {
      toggleAuxiliaryColorModes(payload);
      state.settings.colourWeakness = payload;
    },
    /**
     * Update theme colors
     *
     * @param key Theme color key
     * @param color Theme color
     */
    updateThemeColors(
      state,
      { payload: { key, color } }: PayloadAction<{ key: App.Theme.ThemeColorKey; color: string }>
    ) {
      let colorValue = color;

      if (state.settings.recommendColor) {
        // get a color palette by provided color and color name, and use the suitable color

        colorValue = getPaletteColorByNumber(color, 500, true);
      }

      if (key === 'primary') {
        state.settings.themeColor = colorValue;
      } else {
        state.settings.otherColor[key] = colorValue;
      }
    },
    setIsInfoFollowPrimary(state, { payload }: PayloadAction<boolean>) {
      state.settings.isInfoFollowPrimary = payload;
    },
    setLayoutMode(state, { payload }: PayloadAction<UnionKey.ThemeLayoutMode>) {
      state.settings.layout.mode = payload;
    },
    setLayoutScrollMode(state, { payload }: PayloadAction<UnionKey.ThemeScrollMode>) {
      state.settings.layout.scrollMode = payload;
    },
    setPage(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['page']>>) {
      Object.assign(state.settings.page, payload);
    },
    setFixedHeaderAndTab(state, { payload }: PayloadAction<boolean>) {
      state.settings.fixedHeaderAndTab = payload;
    },
    setHeader(state, { payload }: PayloadAction<DeepPartial<App.Theme.ThemeSetting['header']>>) {
      Object.assign(state.settings.header, payload);
    },
    setTab(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['tab']>>) {
      Object.assign(state.settings.tab, payload);
    },
    setSider(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['sider']>>) {
      Object.assign(state.settings.sider, payload);
    },
    setFooter(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['footer']>>) {
      Object.assign(state.settings.footer, payload);
    },
    setWatermark(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['watermark']>>) {
      Object.assign(state.settings.watermark, payload);
    },
    setIsOnlyExpandCurrentParentMenu(state, { payload }: PayloadAction<boolean>) {
      state.settings.isOnlyExpandCurrentParentMenu = payload;
    },
    changeReverseHorizontalMix(state, { payload }: PayloadAction<boolean>) {
      state.settings.layout.reverseHorizontalMix = payload;
    },
    resetTheme() {
      return initialState;
    }
  },
  selectors: {
    getThemeSettings: theme => theme.settings,
    getDarkMode: theme => theme.darkMode
  }
});

export const { getThemeSettings, getDarkMode } = themeSlice.selectors;

export const {
  setDarkMode,
  setThemeScheme,
  setSiderInverted,
  setGrayscale,
  setRecommendColor,
  updateThemeColors,
  setIsInfoFollowPrimary,
  setLayoutMode,
  setLayoutScrollMode,
  setPage,
  setFixedHeaderAndTab,
  setHeader,
  setTab,
  resetTheme,
  setWatermark,
  setSider,
  setFooter,
  setIsOnlyExpandCurrentParentMenu,
  setColourWeakness,
  changeReverseHorizontalMix
} = themeSlice.actions;

// 计算属性选择器
export const themeColors = createSelector([getThemeSettings], ({ themeColor, otherColor, isInfoFollowPrimary }) => {
  const colors: App.Theme.ThemeColor = {
    primary: themeColor,
    ...otherColor,
    info: isInfoFollowPrimary ? themeColor : otherColor.info
  };
  return colors;
});

/** Cache theme settings */
export const cacheThemeSettings = (): AppThunk => (_, getState) => {
  const isProd = import.meta.env.PROD;

  if (!isProd) return;

  localStg.set('themeSettings', getThemeSettings(getState()));
};

export const settingsJson = createSelector([getThemeSettings], settings => {
  return JSON.stringify(settings);
});

export const toggleThemeScheme = (): AppThunk<boolean> => (dispatch, getState) => {
  const themeSettings = getThemeSettings(getState());
  const index = themeSchemes.findIndex(item => item === themeSettings.themeScheme);
  const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
  const nextThemeScheme = themeSchemes[nextIndex];
  const darkMode = updateDarkMode(nextThemeScheme);
  const themeScheme = nextThemeScheme;
  dispatch(setDarkMode(darkMode));
  dispatch(setThemeScheme(themeScheme));
  return darkMode;
};
