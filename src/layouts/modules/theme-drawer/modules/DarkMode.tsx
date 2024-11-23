import { Segmented, Switch } from 'antd';
import type { SegmentedOptions } from 'antd/es/segmented';

import { themeSchemaRecord } from '@/constants/app';
import {
  getThemeSettings,
  setColourWeakness,
  setGrayscale,
  setIsOnlyExpandCurrentParentMenu,
  setThemeScheme
} from '@/store/slice/theme';

import SettingItem from '../components/SettingItem';
import '@/styles/css/darkMode.css';

const icons: Record<UnionKey.ThemeScheme, string> = {
  auto: 'material-symbols:hdr-auto',
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny'
};

const OPTIONS: SegmentedOptions = Object.keys(themeSchemaRecord).map(item => {
  const key = item as UnionKey.ThemeScheme;
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
});

const DarkMode = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const themeSettings = useAppSelector(getThemeSettings);

  function handleSegmentChange(value: string | number) {
    dispatch(setThemeScheme(value as UnionKey.ThemeScheme));
  }

  function handleGrayscaleChange(value: boolean) {
    dispatch(setGrayscale(value));
  }

  function handleAuxiliaryColorChange(value: boolean) {
    dispatch(setColourWeakness(value));
  }

  function handleIsOnlyExpandCurrentParentMenuChange(value: boolean) {
    dispatch(setIsOnlyExpandCurrentParentMenu(value));
  }
  return (
    <div className="flex-col-stretch gap-16px">
      <div className="i-flex-center">
        <Segmented
          className="bg-layout"
          options={OPTIONS}
          value={themeSettings.themeScheme}
          onChange={handleSegmentChange}
        />
      </div>

      <SettingItem
        label={t('theme.grayscale')}
        seq={1}
      >
        <Switch
          defaultChecked={themeSettings.grayscale}
          onChange={handleGrayscaleChange}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.colourWeakness')}
        seq={2}
      >
        <Switch
          defaultChecked={themeSettings.colourWeakness}
          onChange={handleAuxiliaryColorChange}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.isOnlyExpandCurrentParentMenu')}
        seq={3}
      >
        <Switch
          defaultChecked={themeSettings.isOnlyExpandCurrentParentMenu}
          onChange={handleIsOnlyExpandCurrentParentMenuChange}
        />
      </SettingItem>
    </div>
  );
};

export default DarkMode;
