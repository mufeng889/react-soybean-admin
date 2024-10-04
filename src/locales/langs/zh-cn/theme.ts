const theme: App.I18n.Schema['translation']['theme'] = {
  themeSchema: {
    title: '主题模式',
    light: '亮色模式',
    dark: '暗黑模式',
    auto: '跟随系统'
  },
  grayscale: '灰度模式',
  colourWeakness: '色弱模式',
  isOnlyExpandCurrentParentMenu: '仅展开当前父级菜单',
  layoutMode: {
    title: '布局模式',
    vertical: '左侧菜单模式',
    'vertical-mix': '左侧菜单混合模式',
    horizontal: '顶部菜单模式',
    'horizontal-mix': '顶部菜单混合模式',
    reverseHorizontalMix: '一级菜单与子级菜单位置反转'
  },
  recommendColor: '应用推荐算法的颜色',
  recommendColorDesc: '推荐颜色的算法参照',
  themeColor: {
    title: '主题颜色',
    primary: '主色',
    info: '信息色',
    success: '成功色',
    warning: '警告色',
    error: '错误色',
    followPrimary: '跟随主色'
  },
  scrollMode: {
    title: '滚动模式',
    wrapper: '外层滚动',
    content: '主体滚动'
  },
  page: {
    animate: '页面切换动画',
    mode: {
      title: '页面切换动画类型',
      'fade-slide': '滑动',
      fade: '弹动',
      'fade-bottom': '底部消退',
      'fade-scale': '缩放消退',
      'zoom-fade': '渐变',
      'zoom-out': '闪现',
      none: '无'
    }
  },
  fixedHeaderAndTab: '固定头部和标签栏',
  header: {
    height: '头部高度',
    breadcrumb: {
      visible: '显示面包屑',
      showIcon: '显示面包屑图标'
    }
  },
  tab: {
    visible: '显示标签栏',
    cache: '缓存标签页',
    height: '标签栏高度',
    mode: {
      title: '标签栏风格',
      chrome: '谷歌风格',
      button: '按钮风格'
    }
  },
  sider: {
    inverted: '深色侧边栏',
    width: '侧边栏宽度',
    collapsedWidth: '侧边栏折叠宽度',
    mixWidth: '混合布局侧边栏宽度',
    mixCollapsedWidth: '混合布局侧边栏折叠宽度',
    mixChildMenuWidth: '混合布局子菜单宽度'
  },
  footer: {
    visible: '显示底部',
    fixed: '固定底部',
    height: '底部高度',
    right: '底部局右'
  },
  themeDrawerTitle: '主题配置',
  pageFunTitle: '页面功能',
  watermark: {
    visible: '显示全屏水印',
    text: '水印文本'
  },
  configOperation: {
    copyConfig: '复制配置',
    copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
    resetConfig: '重置配置',
    resetSuccessMsg: '重置成功'
  }
};

export default theme;
