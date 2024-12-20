import { ThemeMode } from 'ahooks/lib/useTheme';
import type { ThemeModeType } from 'ahooks/lib/useTheme';
import type { SegmentedOptions } from 'antd/es/segmented';
import { useContext } from 'react';

import { ThemeContext, icons } from './themeContext';

const ThemeSchemaSegmented = () => {
  const { setThemeScheme, themeScheme } = useContext(ThemeContext);

  const OPTIONS = Object.values(ThemeMode).map(item => {
    const key = item as ThemeModeType;
    return {
      label: (
        <div className="w-[70px] flex justify-center">
          <SvgIcon
            className="h-28px text-icon-small"
            icon={icons[key]}
          />
        </div>
      ),
      value: item
    };
  }) satisfies SegmentedOptions;

  return (
    <ASegmented
      className="bg-layout"
      options={OPTIONS}
      value={themeScheme}
      onChange={setThemeScheme}
    />
  );
};

export default ThemeSchemaSegmented;
