export type ThemeName = 'dark' | 'light';

function usePreferredColorScheme() {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  useEffect(() => {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setThemeName(darkMediaQuery.matches ? 'dark' : 'light');

    darkMediaQuery.addEventListener('change', updateTheme);

    return () => darkMediaQuery.removeEventListener('change', updateTheme);
  }, []);
  function updateTheme(event: MediaQueryListEvent) {
    setThemeName(event.matches ? 'dark' : 'light');
  }

  return {
    isDarkMode: themeName === 'dark',
    isLightMode: themeName === 'light',
    themeName
  };
}

export default usePreferredColorScheme;
