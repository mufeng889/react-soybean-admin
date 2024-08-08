import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Card } from 'antd';
import { Outlet } from 'react-router-dom';
import WaveBg from '@/components/custom/wave-bg';
import SystemLogo from '@/components/common/system-logo';
import ThemeSchemaSwitch from '@/components/common/ThemeSchemaSwitch';
import LangSwitch from '@/components/common/LangSwitch';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';

const COLOR_WHITE = '#ffffff';
export function Component() {
  const darkMode = useAppSelector(getDarkMode);
  const { themeColor } = useAppSelector(getThemeSettings);
  const { t } = useTranslation();

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;
  const ratio = darkMode ? 0.5 : 0.2;
  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor}></WaveBg>
      <Card
        bordered={false}
        className="relative z-4 w-auto rd-12px"
      >
        <div className="w-400px lt-sm:w-300px">
          <header className="flex-y-center justify-between">
            <SystemLogo className="text-64px text-primary lt-sm:text-48px"></SystemLogo>
            <h3 className="text-28px text-primary font-500 lt-sm:text-22px">{t('system.title')}</h3>
            <div className="i-flex-col">
              <ThemeSchemaSwitch
                showTooltip={false}
                className="text-20px lt-sm:text-18px"
              />
              <LangSwitch showTooltip={false} />
            </div>
          </header>
          <main className="pt-24px">
            <Outlet></Outlet>
          </main>
        </div>
      </Card>
    </div>
  );
}
