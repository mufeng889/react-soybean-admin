import { transformRecordToOption } from '@/utils/common';

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__';

export const GLOBAL_SIDER_MENU_ID = '__GLOBAL_SIDER_MENU__';

export const themeSchemaRecord: Record<UnionKey.ThemeScheme, App.I18n.I18nKey> = {
  auto: 'theme.themeSchema.auto',
  dark: 'theme.themeSchema.dark',
  light: 'theme.themeSchema.light'
};

export const themeSchemaOptions = transformRecordToOption(themeSchemaRecord);

export const loginModuleRecord: Record<UnionKey.LoginModule, App.I18n.I18nKey> = {
  'code-login': 'page.login.codeLogin.title',
  'pwd-login': 'page.login.pwdLogin.title',
  register: 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title'
};

export const themeLayoutModeRecord: Record<UnionKey.ThemeLayoutMode, App.I18n.I18nKey> = {
  horizontal: 'theme.layoutMode.horizontal',
  'horizontal-mix': 'theme.layoutMode.horizontal-mix',
  vertical: 'theme.layoutMode.vertical',
  'vertical-mix': 'theme.layoutMode.vertical-mix'
};

export const themeLayoutModeOptions = transformRecordToOption(themeLayoutModeRecord);

export const themeScrollModeRecord: Record<UnionKey.ThemeScrollMode, App.I18n.I18nKey> = {
  content: 'theme.scrollMode.content',
  wrapper: 'theme.scrollMode.wrapper'
};

export const themeScrollModeOptions = transformRecordToOption(themeScrollModeRecord);

export const themeTabModeRecord: Record<UnionKey.ThemeTabMode, App.I18n.I18nKey> = {
  button: 'theme.tab.mode.button',
  chrome: 'theme.tab.mode.chrome'
};

export const themeTabModeOptions = transformRecordToOption(themeTabModeRecord);

export const themePageAnimationModeRecord: Record<UnionKey.ThemePageAnimateMode, App.I18n.I18nKey> = {
  fade: 'theme.page.mode.fade',
  'fade-bottom': 'theme.page.mode.fade-bottom',
  'fade-scale': 'theme.page.mode.fade-scale',
  'fade-slide': 'theme.page.mode.fade-slide',
  none: 'theme.page.mode.none',
  'zoom-fade': 'theme.page.mode.zoom-fade',
  'zoom-out': 'theme.page.mode.zoom-out'
};

export const themePageAnimationModeOptions = transformRecordToOption(themePageAnimationModeRecord);

export const info = `██████╗ ███████╗ █████╗  ██████╗████████╗███████╗ ██████╗ ██╗   ██╗██████╗ ███████╗ █████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗████╗  ██║
██████╔╝█████╗  ███████║██║        ██║   ███████╗██║   ██║ ╚████╔╝ ██████╔╝█████╗  ███████║██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██║██║        ██║   ╚════██║██║   ██║  ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██║██║╚██╗██║
██║  ██║███████╗██║  ██║╚██████╗   ██║   ███████║╚██████╔╝   ██║   ██████╔╝███████╗██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝    ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝`;
