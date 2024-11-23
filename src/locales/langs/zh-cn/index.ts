import common from './common';
import form from './form';
import page from './page';
import route from './route';
import theme from './theme';

const local: App.I18n.Schema['translation'] = {
  common,
  datatable: {
    itemCount: '共 {{total}} 条'
  },
  dropdown: {
    closeAll: '关闭所有',
    closeCurrent: '关闭',
    closeLeft: '关闭左侧',
    closeOther: '关闭其它',
    closeRight: '关闭右侧'
  },
  form,
  icon: {
    collapse: '折叠菜单',
    expand: '展开菜单',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    lang: '切换语言',
    pin: '固定',
    reload: '刷新页面',
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    unpin: '取消固定'
  },
  page,
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  route,
  system: {
    errorReason: '错误原因',
    reload: '重新渲染页面',
    title: 'Soybean 管理系统',
    updateCancel: '稍后再说',
    updateConfirm: '立即刷新',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateTitle: '系统版本更新通知'
  },
  theme
};

export default local;
