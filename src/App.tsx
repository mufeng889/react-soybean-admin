import { useUpdateEffect } from 'ahooks';
import { localStg } from '@/utils/storage';
import { getLocale } from '@/store/slice/app';
import { getAntdTheme, setupThemeVarsToHtml, toggleCssDarkMode } from '@/store/slice/theme/shared.ts';
import { getDarkMode, themeColors, getThemeSettings } from '@/store/slice/theme';
import MenuProvider from '@/components/stateful/MenuProvider.tsx';
import { router } from '@/router';
import { antdLocales } from './locales/antd';
import AppProvider from './components/stateful/AppProvider.tsx';
import { info } from '@/constants/app.ts'
import type { WatermarkProps } from 'antd'

const watermarkProps: WatermarkProps = {
  font: {
    fontSize: 16,
  },
  width: 240,
  height: 128,
  offset: [12, 60],
  rotate: -15,
  zIndex: 9999
};

const App = () => {
  const locale = useAppSelector(getLocale);
  const colors = useAppSelector(themeColors);
  const darkMode = useAppSelector(getDarkMode);
  const antdTheme = getAntdTheme(colors, darkMode);
  const themeSettings = useAppSelector(getThemeSettings);

  useEffect(() => {
    setupThemeVarsToHtml(colors);
    localStg.set('themeColor', colors.primary);
  }, [colors]);

  useUpdateEffect(() => {
    toggleCssDarkMode(darkMode);
  }, [darkMode]);

  console.info(`%c${info}`, `color: ${colors.primary}`);

  return (
    <AConfigProvider
      theme={antdTheme}
      locale={antdLocales[locale]}
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
    >
      <AppProvider>
        <AWatermark content={themeSettings.watermark.visible ? themeSettings.watermark?.text || 'Soybean' : ''} className='h-full'  {...watermarkProps} >
          <MenuProvider>
            {router.CustomRouterProvider(<GlobalLoading />)}
          </MenuProvider>
        </AWatermark>
      </AppProvider>
    </AConfigProvider>
  );
};

export default App;
