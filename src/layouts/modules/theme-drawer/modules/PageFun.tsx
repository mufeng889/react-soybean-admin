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
          className="w-120px"
          defaultValue={themeSetting.layout.scrollMode}
          options={themeScrollModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setLayoutScrollMode(value))}
        />
      </SettingItem>
      <SettingItem
        label={t('theme.page.animate')}
        seq={6}
      >
        <Switch
          defaultValue={themeSetting.page.animate}
          onChange={value => dispatch(setPage({ animate: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.page.mode.title')}
        seq={1}
        show={themeSetting.page.animate}
      >
        <Select
          className="w-120px"
          defaultValue={themeSetting.page.animateMode}
          options={themePageAnimationModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setPage({ animateMode: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.fixedHeaderAndTab')}
        seq={1}
        show={isWrapperScrollMode}
      >
        <Switch
          defaultValue={themeSetting.fixedHeaderAndTab}
          onChange={value => dispatch(setFixedHeaderAndTab(value))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.header.height')}
        seq={7}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.header.height}
          onChange={value => dispatch(setHeader({ height: value ?? 0 }))}
        />
      </SettingItem>
      <SettingItem
        label={t('theme.header.breadcrumb.visible')}
        seq={8}
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { visible: value } }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.header.breadcrumb.showIcon')}
        seq={1}
        show={themeSetting.header.breadcrumb.visible}
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { showIcon: value } }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.tab.visible')}
        seq={9}
      >
        <Switch
          defaultValue={themeSetting.tab.visible}
          onChange={value => dispatch(setTab({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.tab.height')}
        seq={1}
        show={themeSetting.tab.visible}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.tab.height}
          onChange={value => dispatch(setTab({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.tab.mode.title')}
        seq={1}
        show={themeSetting.tab.visible}
      >
        <Select
          className="w-120px"
          defaultValue={themeSetting.tab.mode}
          options={themeTabModeOptions.map(item => ({
            label: t(item.label),
            value: item.value
          }))}
          onChange={value => dispatch(setTab({ mode: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.width')}
        seq={1}
        show={isVertical}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.width}
          onChange={value => dispatch(setSider({ width: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.collapsedWidth')}
        seq={1}
        show={isVertical}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.collapsedWidth}
          onChange={value => dispatch(setSider({ collapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixWidth')}
        seq={1}
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixWidth}
          onChange={value => dispatch(setSider({ mixWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixCollapsedWidth')}
        seq={1}
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixCollapsedWidth}
          onChange={value => dispatch(setSider({ mixCollapsedWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.sider.mixChildMenuWidth')}
        seq={1}
        show={layoutMode === 'vertical-mix'}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixChildMenuWidth}
          onChange={value => dispatch(setSider({ mixChildMenuWidth: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.visible')}
        seq={10}
      >
        <Switch
          defaultValue={themeSetting.footer.visible}
          onChange={value => dispatch(setFooter({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.fixed')}
        seq={1}
        show={Boolean(themeSetting.footer.visible && isWrapperScrollMode)}
      >
        <Switch
          defaultValue={themeSetting.footer.fixed}
          onChange={value => dispatch(setFooter({ fixed: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.height')}
        seq={1}
        show={themeSetting.footer.visible}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.footer.height}
          onChange={value => dispatch(setFooter({ height: value ?? 0 }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.footer.right')}
        seq={1}
        show={Boolean(themeSetting.footer.visible && layoutMode === 'horizontal-mix')}
      >
        <Switch
          defaultValue={themeSetting.footer.right}
          onChange={value => dispatch(setFooter({ right: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.watermark.visible')}
        seq={11}
      >
        <Switch
          defaultValue={themeSetting.watermark?.visible}
          onChange={value => dispatch(setWatermark({ visible: value }))}
        />
      </SettingItem>

      <SettingItem
        label={t('theme.watermark.text')}
        seq={1}
        show={Boolean(themeSetting.watermark.visible)}
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
