import common from './common';
import request from './request';
import theme from './theme';
import route from './route';
import page from './page';
import form from './form';

const local: App.I18n.Schema['translation'] = {
  system: {
    title: 'SoybeanAdmin',
    reload: 'Reload Page',
    errorReason: 'Cause Error'
  },
  common,
  route,
  request,
  theme,
  page,
  form,
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
