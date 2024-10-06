import { Button, Switch, Tooltip } from 'antd';
import { getThemeSettings, setRecommendColor, themeColors } from '@/store/slice/theme';
import SettingItem from '../components/SettingItem';
import CustomPicker from './CustomPicker';

const ThemeColor = memo(() => {
  const { t } = useTranslation();

  const themeSettings = useAppSelector(getThemeSettings);

  const dispatch = useAppDispatch();

  const colors = useAppSelector(themeColors);

  function handleRecommendColorChange(value: boolean) {
    dispatch(setRecommendColor(value));
  }

  return (
    <div className="flex-col-stretch gap-12px">
      <Tooltip
        title={
          <p>
            <span className="pr-12px">{t('theme.recommendColorDesc')}</span>
            <br />
            <Button
              type="link"
              href="https://uicolors.app/create"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray"
            >
              https://uicolors.app/create
            </Button>
          </p>
        }
        placement="topLeft"
      >
        <SettingItem
          seq={4}
          key="recommend-color"
          label={t('theme.recommendColor')}
        >
          <Switch
            defaultChecked={themeSettings.recommendColor}
            onChange={handleRecommendColorChange}
          />
        </SettingItem>
      </Tooltip>
      {Object.entries(colors).map(([key, value], index) => (
        <CustomPicker
          index={index}
          theme={themeSettings.themeColor}
          isInfoFollowPrimary={themeSettings.isInfoFollowPrimary}
          value={value}
          label={key}
          key={key}
        />
      ))}
    </div>
  );
});

export default ThemeColor;
