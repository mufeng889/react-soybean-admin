import { Divider, Segmented, Switch } from 'antd';
import type { SegmentedOptions } from 'antd/es/segmented';
import { CSSTransition } from 'react-transition-group';
import { themeSchemaRecord } from '@/constants/app';
import SvgIcon from '@/components/custom/svg-icon';
import {
  getDarkMode,
  getThemeSettings,
  setGrayscale,
  setIsOnlyExpandCurrentParentMenu,
  setSiderInverted,
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
  const nodeRef = useRef(null);
  const twoNodeRef = useRef(null);
  const darkMode = useAppSelector(getDarkMode);
  const themeSettings = useAppSelector(getThemeSettings);

  const isVertical = themeSettings.layout.mode.includes('vertical');

  const showSiderInverted = !darkMode && isVertical;

  function handleSegmentChange(value: string | number) {
    dispatch(setThemeScheme(value as UnionKey.ThemeScheme));
  }

  function toggleSiderInverted(checked: boolean) {
    dispatch(setSiderInverted(checked));
  }
  function handleGrayscaleChange(value: boolean) {
    dispatch(setGrayscale(value));
  }

  function handleIsOnlyExpandCurrentParentMenuChange(value: boolean) {
    dispatch(setIsOnlyExpandCurrentParentMenu(value));
  }
  return (
    <>
      <Divider>{t('theme.themeSchema.title')}</Divider>
      <div className="flex-col-stretch gap-16px">
        <div className="i-flex-center">
          <Segmented
            value={themeSettings.themeScheme}
            options={OPTIONS}
            className="bg-layout"
            onChange={handleSegmentChange}
          ></Segmented>
        </div>
        <CSSTransition
          timeout={300}
          in={showSiderInverted}
          classNames="sider-inverted"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <SettingItem label={t('theme.sider.inverted')}>
              <Switch
                defaultChecked={themeSettings.sider.inverted}
                onChange={toggleSiderInverted}
              />
            </SettingItem>
          </div>
        </CSSTransition>
        <SettingItem label={t('theme.grayscale')}>
          <Switch
            defaultChecked={themeSettings.grayscale}
            onChange={handleGrayscaleChange}
          />
        </SettingItem>
        <CSSTransition
          timeout={300}
          in={isVertical}
          classNames="sider-inverted"
          nodeRef={twoNodeRef}
        >
          <div ref={twoNodeRef}>
            <SettingItem label={t('theme.isOnlyExpandCurrentParentMenu')}>
              <Switch
                defaultChecked={themeSettings.isOnlyExpandCurrentParentMenu}
                onChange={handleIsOnlyExpandCurrentParentMenuChange}
              />
            </SettingItem>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default DarkMode;
