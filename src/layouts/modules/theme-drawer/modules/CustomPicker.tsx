import type { CheckboxProps, ColorPickerProps } from 'antd';
import { setIsInfoFollowPrimary, updateThemeColors } from '@/store/slice/theme';
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

interface Props {
  label: string;
  value: string;
  index: number;
  theme: string;
  isInfoFollowPrimary: boolean;
}

const CustomPicker: FC<Props> = memo(({ label, value, theme, isInfoFollowPrimary, index }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function handleUpdateColor(color: string, name: App.Theme.ThemeColorKey) {
    dispatch(updateThemeColors({ key: name, color }));
  }

  const [selectTheme, setSelectTheme] = useState<string>(theme);

  const onChange: CheckboxProps['onChange'] = e => {
    dispatch(setIsInfoFollowPrimary(e.target.checked));
  };

  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Picker } }) => (
    <ASpace
      direction="vertical"
      className="w-250px"
    >
      <>
        <Picker />
        <AFlex
          wrap
          gap="small"
        >
          {swatches.map(item => (
            <ATooltip
              key={item.name}
              title={item.name}
            >
              <span
                onClick={() => {
                  handleUpdateColor(item.color, selectTheme as App.Theme.ThemeColorKey);
                }}
              >
                <AColorPicker
                  size="small"
                  defaultValue={item.color}
                  open={false}
                />
              </span>
            </ATooltip>
          ))}
        </AFlex>
      </>
    </ASpace>
  );

  return (
    <SettingItem
      seq={index + 5}
      suffix={
        label === 'info' && (
          <ACheckbox
            defaultChecked={isInfoFollowPrimary}
            onChange={onChange}
          >
            {t('theme.themeColor.followPrimary')}
          </ACheckbox>
        )
      }
      label={t(`theme.themeColor.${label}`)}
    >
      <AColorPicker
        value={value}
        disabled={label === 'info' && isInfoFollowPrimary}
        onOpenChange={() => {
          setSelectTheme(label);
        }}
        onChange={(_, hex) => handleUpdateColor(hex, label as App.Theme.ThemeColorKey)}
        panelRender={customPanelRender}
      />
    </SettingItem>
  );
});

export default CustomPicker;
