/** The storage namespace */
declare namespace StorageType {
  interface Session {
    /** The theme color */
    themeColor: string;
    // /**
    //  * the theme settings
    //  */
    // themeSettings: App.Theme.ThemeSetting;
  }

  interface Local {
    /** The backup theme setting before is mobile */
    backupThemeSettingBeforeIsMobile: {
      layout: UnionKey.ThemeLayoutMode;
      siderCollapse: boolean;
    };
    /** The global tabs */
    globalTabs: App.Global.Tab[];
    /** The i18n language */
    lang: App.I18n.LangType;
    /** Fixed sider with mix-menu */
    mixSiderFixed: CommonType.YesOrNo;
    /**
     * The override theme flags
     *
     * The value is the build time of the project
     */
    overrideThemeFlag: string;
    /** The refresh token */
    refreshToken: string;
    /** The theme color */
    themeColor: string;
    /** The theme settings */
    themeSettings: App.Theme.ThemeSetting;
    /** The token */
    token: string;
    /** The user info */
    userInfo: Api.Auth.UserInfo;
  }
}
