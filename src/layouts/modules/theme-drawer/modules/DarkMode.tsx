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
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto'
};

const OPTIONS: SegmentedOptions = Object.keys(themeSchemaRecord).map(item => {
  const key = item as UnionKey.ThemeScheme;
  return {
    value: item,
    label: (
      <div className="w-[70px] flex justify-center">
        <SvgIcon
          icon={icons[key]}
          className="h-28px text-icon-small"
        />
      </div>
    )
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
          value={themeSettings.themeScheme}
          options={OPTIONS}
          className="bg-layout"
          onChange={handleSegmentChange}
        ></Segmented>
      </div>

      <SettingItem
        seq={1}
        label={t('theme.grayscale')}
      >
        <Switch
          defaultChecked={themeSettings.grayscale}
          onChange={handleGrayscaleChange}
        />
      </SettingItem>

      <SettingItem
        seq={2}
        label={t('theme.colourWeakness')}
      >
        <Switch
          defaultChecked={themeSettings.colourWeakness}
          onChange={handleAuxiliaryColorChange}
        />
      </SettingItem>

      <SettingItem
        seq={3}
        label={t('theme.isOnlyExpandCurrentParentMenu')}
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
