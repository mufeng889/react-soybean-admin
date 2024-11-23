/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  colourWeakness: false,
  fixedHeaderAndTab: true,
  footer: {
    fixed: false,
    height: 48,
    right: true,
    visible: true
  },
  grayscale: false,
  header: {
    breadcrumb: {
      showIcon: true,
      visible: true
    },
    height: 56
  },
  isInfoFollowPrimary: true,
  isOnlyExpandCurrentParentMenu: true,
  layout: {
    mode: 'vertical',
    reverseHorizontalMix: false,
    scrollMode: 'content'
  },
  otherColor: {
    error: '#f5222d',
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14'
  },
  page: {
    animate: true,
    animateMode: 'fade'
  },
  recommendColor: false,
  sider: {
    collapsedWidth: 64,
    inverted: false,
    mixChildMenuWidth: 200,
    mixCollapsedWidth: 64,
    mixWidth: 90,
    width: 220
  },
  tab: {
    cache: true,
    height: 44,
    mode: 'chrome',
    visible: true
  },
  themeColor: '#646cff',
  themeScheme: 'light',
  tokens: {
    dark: {
      colors: {
        'base-text': 'rgb(224, 224, 224)',
        container: 'rgb(28, 28, 28)',
        layout: 'rgb(18, 18, 18)'
      }
    },
    light: {
      boxShadow: {
        header: '0 1px 2px rgb(0, 21, 41, 0.08)',
        sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
        tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
      },
      colors: {
        'base-text': 'rgb(31, 31, 31)',
        container: 'rgb(255, 255, 255)',
        inverted: 'rgb(0, 20, 40)',
        layout: 'rgb(247, 250, 252)'
      }
    }
  },
  watermark: {
    text: 'SoybeanAdmin',
    visible: false
  }
};

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  watermark: {
    text: 'SoybeanAdmin',
    visible: false
  }
};
