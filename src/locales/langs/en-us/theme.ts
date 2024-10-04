const theme: App.I18n.Schema['translation']['theme'] = {
  themeSchema: {
    title: 'Theme Schema',
    light: 'Light',
    dark: 'Dark',
    auto: 'Follow System'
  },
  grayscale: 'Grayscale',
  colourWeakness: 'Colour Weakness',
  isOnlyExpandCurrentParentMenu: 'Only Expand Current Parent Menu',
  layoutMode: {
    title: 'Layout Mode',
    vertical: 'Vertical Menu Mode',
    horizontal: 'Horizontal Menu Mode',
    'vertical-mix': 'Vertical Mix Menu Mode',
    'horizontal-mix': 'Horizontal Mix menu Mode',
    reverseHorizontalMix: 'Reverse first level menus and child level menus position'
  },
  recommendColor: 'Apply Recommended Color Algorithm',
  recommendColorDesc: 'The recommended color algorithm refers to',
  themeColor: {
    title: 'Theme Color',
    primary: 'Primary',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    followPrimary: 'Follow Primary'
  },
  scrollMode: {
    title: 'Scroll Mode',
    wrapper: 'Wrapper',
    content: 'Content'
  },
  page: {
    animate: 'Page Animate',
    mode: {
      title: 'Page Animate Mode',
      fade: 'Springing',
      'fade-slide': 'Slide',
      'fade-bottom': 'Fade Zoom',
      'fade-scale': 'Fade Scale',
      'zoom-fade': 'Zoom Fade',
      'zoom-out': 'Zoom Out',
      none: 'None'
    }
  },
  fixedHeaderAndTab: 'Fixed Header And Tab',
  header: {
    height: 'Header Height',
    breadcrumb: {
      visible: 'Breadcrumb Visible',
      showIcon: 'Breadcrumb Icon Visible'
    }
  },
  tab: {
    visible: 'Tab Visible',
    cache: 'Tab Cache',
    height: 'Tab Height',
    mode: {
      title: 'Tab Mode',
      chrome: 'Chrome',
      button: 'Button'
    }
  },
  sider: {
    inverted: 'Dark Sider',
    width: 'Sider Width',
    collapsedWidth: 'Sider Collapsed Width',
    mixWidth: 'Mix Sider Width',
    mixCollapsedWidth: 'Mix Sider Collapse Width',
    mixChildMenuWidth: 'Mix Child Menu Width'
  },
  footer: {
    visible: 'Footer Visible',
    fixed: 'Fixed Footer',
    height: 'Footer Height',
    right: 'Right Footer'
  },
  themeDrawerTitle: 'Theme Configuration',
  pageFunTitle: 'Page Function',
  configOperation: {
    copyConfig: 'Copy Config',
    copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
    resetConfig: 'Reset Config',
    resetSuccessMsg: 'Reset Success'
  },
  watermark: {
    visible: 'Watermark Full Screen Visible',
    text: 'Watermark Text'
  }
};

export default theme;
