import { InputNumber, Select, Switch } from 'antd';
import { themePageAnimationModeOptions, themeScrollModeOptions, themeTabModeOptions } from '@/constants/app';
import {
  getThemeSettings,
  setFixedHeaderAndTab,
  setFooter,
  setHeader,
  setLayoutScrollMode,
  setPage,
  setSider,
  setTab,
  setWatermark
} from '@/store/slice/theme';
import SettingItem from '../components/SettingItem';

const PageFun = memo(() => {
  const { t } = useTranslation();

  const themeSetting = useAppSelector(getThemeSettings);

  const dispatch = useAppDispatch();

  const isWrapperScrollMode = themeSetting.layout.scrollMode === 'wrapper';

  const layoutMode = themeSetting.layout.mode;

  const isMixLayoutMode = layoutMode.includes('mix');

  const isVertical = layoutMode === 'vertical';

  return (
    <div className="relative flex-col-stretch gap-12px">
      <SettingItem
        label={t('theme.scrollMode.title')}
        seq={5}
      >
        <Select
          defaultValue={themeSetting.layout.scrollMode}
          options={themeScrollModeOptions.map(item => ({
            value: item.value,
            label: t(item.label)
          }))}
          onChange={value => dispatch(setLayoutScrollMode(value))}
          className="w-120px"
        ></Select>
      </SettingItem>
      <SettingItem
        seq={6}
        label={t('theme.page.animate')}
      >
        <Switch
          onChange={value => dispatch(setPage({ animate: value }))}
          defaultValue={themeSetting.page.animate}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.page.mode.title')}
        show={themeSetting.page.animate}
      >
        <Select
          className="w-120px"
          options={themePageAnimationModeOptions.map(item => ({
            value: item.value,
            label: t(item.label)
          }))}
          defaultValue={themeSetting.page.animateMode}
          onChange={value => dispatch(setPage({ animateMode: value }))}
        ></Select>
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.fixedHeaderAndTab')}
        show={isWrapperScrollMode}
      >
        <Switch
          defaultValue={themeSetting.fixedHeaderAndTab}
          onChange={value => dispatch(setFixedHeaderAndTab(value))}
        />
      </SettingItem>

      <SettingItem
        seq={7}
        label={t('theme.header.height')}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.header.height}
          onChange={value => dispatch(setHeader({ height: value ?? 0 }))}
        />
      </SettingItem>
      <SettingItem
        seq={8}
        label={t('theme.header.breadcrumb.visible')}
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { visible: value } }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.header.breadcrumb.showIcon')}
        show={themeSetting.header.breadcrumb.visible}
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { showIcon: value } }))}
        />
      </SettingItem>

      <SettingItem
        seq={9}
        label={t('theme.tab.visible')}
      >
        <Switch
          defaultValue={themeSetting.tab.visible}
          onChange={value => dispatch(setTab({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.tab.height')}
        show={themeSetting.tab.visible}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.tab.height}
          onChange={value => dispatch(setTab({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.tab.mode.title')}
        show={themeSetting.tab.visible}
      >
        <Select
          className="w-120px"
          options={themeTabModeOptions.map(item => ({
            value: item.value,
            label: t(item.label)
          }))}
          defaultValue={themeSetting.tab.mode}
          onChange={value => dispatch(setTab({ mode: value }))}
        ></Select>
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.sider.width')}
        show={isVertical}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.width}
          onChange={value => dispatch(setSider({ width: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={isVertical}
        label={t('theme.sider.collapsedWidth')}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.collapsedWidth}
          onChange={value => dispatch(setSider({ collapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={isMixLayoutMode}
        label={t('theme.sider.mixWidth')}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixWidth}
          onChange={value => dispatch(setSider({ mixWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.sider.mixCollapsedWidth')}
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixCollapsedWidth}
          onChange={value => dispatch(setSider({ mixCollapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={layoutMode === 'vertical-mix'}
        label={t('theme.sider.mixChildMenuWidth')}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixChildMenuWidth}
          onChange={value => dispatch(setSider({ mixChildMenuWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={10}
        label={t('theme.footer.visible')}
      >
        <Switch
          defaultValue={themeSetting.footer.visible}
          onChange={value => dispatch(setFooter({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        label={t('theme.footer.fixed')}
        show={Boolean(themeSetting.footer.visible && isWrapperScrollMode)}
      >
        <Switch
          defaultValue={themeSetting.footer.fixed}
          onChange={value => dispatch(setFooter({ fixed: value }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={themeSetting.footer.visible}
        label={t('theme.footer.height')}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.footer.height}
          onChange={value => dispatch(setFooter({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={Boolean(themeSetting.footer.visible && layoutMode === 'horizontal-mix')}
        label={t('theme.footer.right')}
      >
        <Switch
          defaultValue={themeSetting.footer.right}
          onChange={value => dispatch(setFooter({ right: value }))}
        />
      </SettingItem>

      <SettingItem
        seq={11}
        label={t('theme.watermark.visible')}
      >
        <Switch
          defaultValue={themeSetting.watermark?.visible}
          onChange={value => dispatch(setWatermark({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        seq={1}
        show={Boolean(themeSetting.watermark.visible)}
        label={t('theme.watermark.text')}
      >
        <AInput
          allowClear
          className="w-120px"
          defaultValue={themeSetting.watermark.text}
          onChange={value => dispatch(setWatermark({ text: value.target.value || '' }))}
        />
      </SettingItem>
    </div>
  );
});

export default PageFun;
