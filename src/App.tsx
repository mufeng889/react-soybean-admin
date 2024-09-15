import { useUpdateEffect } from 'ahooks';
import type { WatermarkProps } from 'antd';
import { RouterProvider } from '@sa/simple-router';
import { localStg } from '@/utils/storage';
import { getLocale } from '@/store/slice/app';
import { getAntdTheme, setupThemeVarsToHtml, toggleCssDarkMode } from '@/store/slice/theme/shared';
import { getDarkMode, getThemeSettings, themeColors } from '@/store/slice/theme';
import { router } from '@/router';
import { info } from '@/constants/app';
import { antdLocales } from './locales/antd';
import AppProvider from './components/stateful/AppProvider';

const watermarkProps: WatermarkProps = {
  font: {
    fontSize: 16
  },
  width: 240,
  height: 128,
  offset: [12, 60],
  rotate: -15,
  zIndex: 9999
};

function useTheme() {
  const themeSettings = useAppSelector(getThemeSettings);
  const colors = useAppSelector(themeColors);

  const darkMode = useAppSelector(getDarkMode);
  const antdTheme = getAntdTheme(colors, darkMode, themeSettings.tokens);

  useEffect(() => {
    setupThemeVarsToHtml(colors, themeSettings.tokens, themeSettings.recommendColor);
    localStg.set('themeColor', colors.primary);
  }, [colors, themeSettings]);

  useUpdateEffect(() => {
    toggleCssDarkMode(darkMode);
  }, [darkMode]);

  console.info(`%c${info}`, `color: ${colors.primary}`);

  return { antdTheme, themeSettings };
}

const App = () => {
  const locale = useAppSelector(getLocale);

  const { antdTheme, themeSettings } = useTheme();

  return (
    <AConfigProvider
      theme={antdTheme}
      locale={antdLocales[locale]}
      card={{ styles: { body: { padding: '12px 16px ', flex: 1, overflow: 'hidden' } } }}
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
    >
      <AppProvider>
        <AWatermark
          content={themeSettings.watermark.visible ? themeSettings.watermark?.text || 'Soybean' : ''}
          className="h-full"
          {...watermarkProps}
        >
          <RouterProvider
            fallback={<GlobalLoading />}
            router={router}
          />
        </AWatermark>
      </AppProvider>
    </AConfigProvider>
  );
};

export default App;
