import { Switch } from 'antd';

import { ThemeSchemaSegmented } from '@/features';
import {
  getThemeSettings,
  setColourWeakness,
  setGrayscale,
  setIsOnlyExpandCurrentParentMenu
} from '@/store/slice/theme';

import SettingItem from '../components/SettingItem';
import '@/styles/css/darkMode.css';

const DarkMode = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const themeSettings = useAppSelector(getThemeSettings);

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
        <ThemeSchemaSegmented />
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
