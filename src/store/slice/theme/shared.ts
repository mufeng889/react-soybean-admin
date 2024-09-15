import { getColorPalette, getRgb, transformColorWithOpacity } from '@sa/color';
import type { ConfigProviderProps } from 'antd';
import { theme as antdTheme } from 'antd';
import { overrideThemeSettings, themeSettings } from '@/theme/settings';
import { localStg } from '@/utils/storage';
import { themeVars } from '@/theme/vars';
import { toggleHtmlClass } from '@/utils/common';
import { DARK_MODE_MEDIA_QUERY } from '@/constants/common';

const DARK_CLASS = 'dark';

/** Init theme settings */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD;

  // if it is development mode, the theme settings will not be cached, by update `themeSettings` in `src/theme/settings.ts` to update theme settings
  if (!isProd) return themeSettings;

  // if it is production mode, the theme settings will be cached in localStorage
  // if want to update theme settings when publish new version, please update `overrideThemeSettings` in `src/theme/settings.ts`

  const settings = localStg.get('themeSettings') || themeSettings;

  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME;

  if (!isOverride) {
    Object.assign(settings, overrideThemeSettings);
    localStg.set('overrideThemeFlag', BUILD_TIME);
  }

  return settings;
}

/**
 * Get css var by tokens
 *
 * @param tokens Theme base tokens
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgb(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * Add theme vars to global
 *
 * @param tokens
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
   :root {
      ${cssVarStr}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}
/**
 * Create theme palette colors
 *
 * @param colors Theme colors
 * @param [recommended=false] Use recommended color. Default is `false`
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended);

    colorPaletteVar[key] = colorMap.get(500)!;

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}

/**
 * create theme token css vars value by theme settings
 *
 * @param colors Theme colors
 * @param tokens Theme setting tokens
 * @param [recommended=false] Use recommended color. Default is `false`
 */
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false
) {
  const paletteColors = createThemePaletteColors(colors, recommended);

  const { light, dark } = tokens || themeSettings.tokens;

  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors
    },
    boxShadow: {
      ...light.boxShadow
    }
  };

  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow
    }
  };

  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * Get antd theme
 *
 * @param colors Theme colors
 * @param darkMode Is dark mode
 */
export function getAntdTheme(
  colors: App.Theme.ThemeColor,
  darkMode: boolean,
  tokens: App.Theme.ThemeSetting['tokens']
) {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  const { primary, info, success, warning, error } = colors;

  const bgColor = transformColorWithOpacity(primary, darkMode ? 0.3 : 0.1, darkMode ? '#000000' : '#fff');
  const containerBgColor = darkMode ? tokens.dark?.colors?.container : tokens.light?.colors.container;

  const theme: ConfigProviderProps['theme'] = {
    token: {
      colorPrimary: primary,
      colorInfo: info,
      colorSuccess: success,
      colorWarning: warning,
      colorError: error,
      colorBgContainer: containerBgColor
    },
    cssVar: true,
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    components: {
      Button: {
        controlHeightSM: 28
      },
      Collapse: {
        headerBg: containerBgColor,
        contentPadding: '16px 16px 24px 16px'
      },
      Menu: {
        subMenuItemBg: 'transparent',
        darkSubMenuItemBg: 'transparent',
        darkItemBg: 'transparent',
        itemSelectedBg: bgColor,
        itemMarginInline: 8
      }
    }
  };

  return theme;
}
/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS);
  }

  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS);
  }

  if (darkMode) {
    addDarkClass();
  } else {
    removeDarkClass();
  }
}

/**
 * Toggle auxiliary color modes
 *
 * @param grayscaleMode
 * @param colourWeakness
 */
export function toggleAuxiliaryColorModes(colourWeakness = false) {
  const htmlElement = document.documentElement;
  htmlElement.style.filter = colourWeakness ? 'invert(80%)' : '';
}

/** Setup theme vars to html */
export function setupThemeVarsToHtml(
  themeColors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false
) {
  const { themeTokens, darkThemeTokens } = createThemeToken(themeColors, tokens, recommended);
  addThemeVarsToGlobal(themeTokens, darkThemeTokens);
}

export function updateDarkMode(themeScheme: UnionKey.ThemeScheme) {
  if (themeScheme === 'dark') {
    return true;
  } else if (themeScheme === 'light') {
    return false;
  }
  return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
}

export function toggleGrayscaleMode(grayscaleMode = false) {
  const GRAYSCALE_CLASS = 'grayscale';

  const { add, remove } = toggleHtmlClass(GRAYSCALE_CLASS);

  if (grayscaleMode) {
    add();
  } else {
    remove();
  }
}
