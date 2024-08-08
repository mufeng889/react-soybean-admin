import { Button, Checkbox, ColorPicker, Divider, Flex, Space, Switch, Tooltip } from 'antd';
import type { CheckboxProps, ColorPickerProps } from 'antd';
import {
  getThemeSettings,
  setIsInfoFollowPrimary,
  setRecommendColor,
  themeColors,
  updateThemeColors
} from '@/store/slice/theme';
import SettingItem from '../components/SettingItem';

const swatches: { name: string; color: string }[] = [
  { name: '海洋蓝', color: '#3b82f6' },
  { name: '紫罗兰', color: '#6366f1' },
  { name: '梦幻紫', color: '#8b5cf6' },
  { name: '迷人紫', color: '#a855f7' },
  { name: '清澈海洋', color: '#0ea5e9' },
  { name: '天空蓝', color: '#06b6d4' },
  { name: '樱桃红', color: '#f43f5e' },
  { name: '火焰红', color: '#ef4444' },
  { name: '玫瑰粉', color: '#ec4899' },
  { name: '紫色魅影', color: '#d946ef' },
  { name: '橙色阳光', color: '#f97316' },
  { name: '金色晨曦', color: '#f59e0b' },
  { name: '柠檬黄', color: '#eab308' },
  { name: '草地绿', color: '#84cc16' },
  { name: '清新绿', color: '#22c55e' },
  { name: '热带绿', color: '#10b981' }
];

const ThemeColor = memo(() => {
  const { t } = useTranslation();
  const themeSettings = useAppSelector(getThemeSettings);
  const dispatch = useAppDispatch();
  const colors = useAppSelector(themeColors);
  const [selectTheme, setSelectTheme] = useState(themeSettings.themeColor);
  function handleRecommendColorChange(value: boolean) {
    dispatch(setRecommendColor(value));
  }
  function handleUpdateColor(color: string, key: App.Theme.ThemeColorKey) {
    dispatch(updateThemeColors({ key, color }));
  }
  const onChange: CheckboxProps['onChange'] = e => {
    dispatch(setIsInfoFollowPrimary(e.target.checked));
  };

  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Picker } }) => (
    <Space
      direction="vertical"
      className="w-250px"
    >
      <Picker />
      <Flex
        wrap
        gap="small"
      >
        {swatches.map(item => (
          <Tooltip
            key={item.name}
            title={item.name}
          >
            <span
              onClick={() => {
                handleUpdateColor(item.color, selectTheme as App.Theme.ThemeColorKey);
              }}
            >
              <ColorPicker
                size="small"
                defaultValue={item.color}
                open={false}
              />
            </span>
          </Tooltip>
        ))}
      </Flex>
    </Space>
  );

  return (
    <>
      <Divider>{t('theme.themeColor.title')}</Divider>
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
          <>
            <SettingItem
              key="recommend-color"
              label={t('theme.recommendColor')}
            >
              <Switch
                defaultChecked={themeSettings.recommendColor}
                onChange={handleRecommendColorChange}
              />
            </SettingItem>
          </>
        </Tooltip>
        {Object.entries(colors).map(([key, value]) => (
          <SettingItem
            key={key}
            suffix={
              key === 'info' && (
                <Checkbox
                  defaultChecked={themeSettings.isInfoFollowPrimary}
                  onChange={onChange}
                >
                  {t('theme.themeColor.followPrimary')}
                </Checkbox>
              )
            }
            label={t(`theme.themeColor.${key}`)}
          >
            <ColorPicker
              value={value}
              disabled={key === 'info' && themeSettings.isInfoFollowPrimary}
              onOpenChange={() => {
                setSelectTheme(key);
              }}
              onChange={(_, hex) => handleUpdateColor(hex, key as App.Theme.ThemeColorKey)}
              panelRender={customPanelRender}
            />
          </SettingItem>
        ))}
      </div>
    </>
  );
});

export default ThemeColor;
