import { ThemeMode, type ThemeModeType } from 'ahooks/lib/useTheme';
import type { FC, PropsWithChildren } from 'react';

import { localStg } from '@/utils/storage';

import { ThemeContext, toggleCssDarkMode } from './themeContext';

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeModeType>((localStg.get('themeMode') as ThemeModeType) || 'light');

  const darkMode = themeMode === 'dark';

  function changeThemeMode(mode: ThemeModeType) {
    setThemeMode(mode);

    localStg.set('themeMode', mode);
  }

  const toggleThemeScheme = () => {
    const themeModes = Object.values(ThemeMode);
    const index = themeModes.findIndex(item => item === themeMode);
    const nextIndex = index === themeModes.length - 1 ? 0 : index + 1;

    changeThemeMode(themeModes[nextIndex]);
  };

  useEffect(() => {
    toggleCssDarkMode(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    const handler = (event: MediaQueryListEvent) => {
      if (themeMode !== 'system') return;
      changeThemeMode(event.matches ? 'dark' : 'light');
    };
    return () => {
      // 在组件卸载时清理监听器
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return (
    <ThemeContext value={{ darkMode, setThemeScheme: changeThemeMode, themeScheme: themeMode, toggleThemeScheme }}>
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
