import { ConfigProvider } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { localStg } from '@/utils/storage';
import { getLocale } from '@/store/slice/app';
import { getAntdTheme, setupThemeVarsToHtml, toggleCssDarkMode } from '@/store/slice/theme/shared.ts';
import { getDarkMode, themeColors } from '@/store/slice/theme/index.ts';
import MenuProvider from '@/components/common/MenuProvider.tsx';
import { router } from '@/router';
import { antdLocales } from './locales/antd';
import AppProvider from './components/common/AppProvider.tsx';
import GlobalLoading from './components/common/GlobalLoading.tsx';

const App = () => {
  const locale = useAppSelector(getLocale);
  const colors = useAppSelector(themeColors);
  const darkMode = useAppSelector(getDarkMode);
  const antdTheme = getAntdTheme(colors, darkMode);

  useEffect(() => {
    setupThemeVarsToHtml(colors);
    localStg.set('themeColor', colors.primary);
  }, [colors]);

  useUpdateEffect(() => {
    toggleCssDarkMode(darkMode);
  }, [darkMode]);

  return (
    <ConfigProvider
      theme={antdTheme}
      locale={antdLocales[locale]}
      button={{ classNames: { icon: 'align-1px  text-icon' } }}
    >
      <MenuProvider>
        <AppProvider>{router.CustomRouterProvider(<GlobalLoading />)}</AppProvider>
      </MenuProvider>
    </ConfigProvider>
  );
};

export default App;
