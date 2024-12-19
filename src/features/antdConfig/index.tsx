import React, { useContext } from 'react';

import { info } from '@/constants/app';
import { antdLocales } from '@/locales/antd';
import { getLocale } from '@/store/slice/app';
import { getThemeSettings, themeColors } from '@/store/slice/theme';
import { getAntdTheme, setupThemeVarsToHtml } from '@/store/slice/theme/shared';
import { localStg } from '@/utils/storage';

import { ThemeContext } from '../themeSchema';

function useTheme() {
  const themeSettings = useAppSelector(getThemeSettings);
  const colors = useAppSelector(themeColors);

  const { darkMode } = useContext(ThemeContext);

  const antdTheme = getAntdTheme(colors, darkMode, themeSettings.tokens);

  useEffect(() => {
    setupThemeVarsToHtml(colors, themeSettings.tokens, themeSettings.recommendColor);
    localStg.set('themeColor', colors.primary);
  }, [colors, themeSettings]);

  console.info(`%c${info}`, `color: ${colors.primary}`);

  return antdTheme;
}

function AntdConfig({ children }: { readonly children: React.ReactNode }) {
  const locale = useAppSelector(getLocale);

  const antdTheme = useTheme();

  return (
    <AConfigProvider
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px ' } } }}
      locale={antdLocales[locale]}
      theme={antdTheme}
    >
      {children}
    </AConfigProvider>
  );
}

export default AntdConfig;
