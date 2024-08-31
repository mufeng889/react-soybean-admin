import { InputNumber, Select, Switch } from 'antd';
import { CSSTransition } from 'react-transition-group';
import type { FC } from 'react';
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
import './pageFun.scss';

interface Props {
  children: React.ReactNode;
  transitionKey: string;
  label: React.ReactNode;
  show: boolean;
}

const SettingTransitionItem: FC<Props> = memo(({ children, show, transitionKey, label }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Set hasMounted to true after the first render
    setHasMounted(true);
  }, []);
  // Determine if the CSSTransition should be active
  const shouldAnimate = hasMounted ? show : true;

  return (
    <CSSTransition
      nodeRef={ref}
      classNames="setting-list"
      key={transitionKey}
      in={shouldAnimate}
      timeout={300}
      appear={!show}
    >
      <div ref={ref}>
        <SettingItem label={label}>{children}</SettingItem>
      </div>
    </CSSTransition>
  );
});

const PageFun = memo(() => {
  const { t } = useTranslation();
  const themeSetting = useAppSelector(getThemeSettings);
  const dispatch = useAppDispatch();

  const isWrapperScrollMode = themeSetting.layout.scrollMode === 'wrapper';
  const layoutMode = themeSetting.layout.mode;
  const isMixLayoutMode = layoutMode.includes('mix');
  const isVertical = layoutMode === 'vertical';

  return (
    <div className="relative flex-col-stretch gap-12px overflow-hidden">
      <SettingItem
        label={t('theme.scrollMode.title')}
        key="1"
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
        label={t('theme.page.animate')}
        key="1-1"
      >
        <Switch
          onChange={value => dispatch(setPage({ animate: value }))}
          defaultValue={themeSetting.page.animate}
        />
      </SettingItem>

      <SettingTransitionItem
        transitionKey="1-2"
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
      </SettingTransitionItem>

      <SettingTransitionItem
        label={t('theme.fixedHeaderAndTab')}
        transitionKey="2"
        show={isWrapperScrollMode}
      >
        <Switch
          defaultValue={themeSetting.fixedHeaderAndTab}
          onChange={value => dispatch(setFixedHeaderAndTab(value))}
        />
      </SettingTransitionItem>

      <SettingItem
        label={t('theme.header.height')}
        key="3"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.header.height}
          onChange={value => dispatch(setHeader({ height: value ?? 0 }))}
        />
      </SettingItem>
      <SettingItem
        label={t('theme.header.breadcrumb.visible')}
        key="4"
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { visible: value } }))}
        />
      </SettingItem>

      <SettingTransitionItem
        label={t('theme.header.breadcrumb.showIcon')}
        transitionKey="4-1"
        show={themeSetting.header.breadcrumb.visible}
      >
        <Switch
          defaultValue={themeSetting.header.breadcrumb.visible}
          onChange={value => dispatch(setHeader({ breadcrumb: { showIcon: value } }))}
        />
      </SettingTransitionItem>

      <SettingItem
        label={t('theme.tab.visible')}
        key="5"
      >
        <Switch
          defaultValue={themeSetting.tab.visible}
          onChange={value => dispatch(setTab({ visible: value }))}
        />
      </SettingItem>

      <SettingTransitionItem
        label={t('theme.tab.height')}
        transitionKey="5-1"
        show={themeSetting.tab.visible}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.tab.height}
          onChange={value => dispatch(setTab({ height: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        transitionKey="5-2"
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
      </SettingTransitionItem>

      <SettingTransitionItem
        label={t('theme.sider.width')}
        show={isVertical}
        transitionKey="6-1"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.width}
          onChange={value => dispatch(setSider({ width: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        show={isVertical}
        label={t('theme.sider.collapsedWidth')}
        transitionKey="6-2"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.collapsedWidth}
          onChange={value => dispatch(setSider({ collapsedWidth: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        show={isMixLayoutMode}
        label={t('theme.sider.mixWidth')}
        transitionKey="6-3"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixWidth}
          onChange={value => dispatch(setSider({ mixWidth: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        label={t('theme.sider.mixCollapsedWidth')}
        transitionKey="6-4"
        show={isMixLayoutMode}
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixCollapsedWidth}
          onChange={value => dispatch(setSider({ mixCollapsedWidth: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        show={layoutMode === 'vertical-mix'}
        label={t('theme.sider.mixChildMenuWidth')}
        transitionKey="6-5"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.sider.mixChildMenuWidth}
          onChange={value => dispatch(setSider({ mixChildMenuWidth: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingItem
        label={t('theme.footer.visible')}
        key="7"
      >
        <Switch
          defaultValue={themeSetting.footer.visible}
          onChange={value => dispatch(setFooter({ visible: value }))}
        />
      </SettingItem>

      <SettingTransitionItem
        label={t('theme.footer.fixed')}
        transitionKey="7-1"
        show={Boolean(themeSetting.footer.visible && isWrapperScrollMode)}
      >
        <Switch
          defaultValue={themeSetting.footer.fixed}
          onChange={value => dispatch(setFooter({ fixed: value }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        show={themeSetting.footer.visible}
        label={t('theme.footer.height')}
        transitionKey="7-2"
      >
        <InputNumber
          className="w-120px"
          defaultValue={themeSetting.footer.height}
          onChange={value => dispatch(setFooter({ height: value ?? 0 }))}
        />
      </SettingTransitionItem>

      <SettingTransitionItem
        show={Boolean(themeSetting.footer.visible && layoutMode === 'horizontal-mix')}
        label={t('theme.footer.right')}
        transitionKey="7-3"
      >
        <Switch
          defaultValue={themeSetting.footer.right}
          onChange={value => dispatch(setFooter({ right: value }))}
        />
      </SettingTransitionItem>

      <SettingItem label={t('theme.watermark.visible')}>
        <Switch
          defaultValue={themeSetting.watermark?.visible}
          onChange={value => dispatch(setWatermark({ visible: value }))}
        />
      </SettingItem>

      <SettingTransitionItem
        show={Boolean(themeSetting.watermark.visible)}
        label={t('theme.watermark.text')}
        transitionKey="8-1"
      >
        <AInput
          allowClear
          className="w-120px"
          defaultValue={themeSetting.watermark.text}
          onChange={value => dispatch(setWatermark({ text: value.target.value || '' }))}
        />
      </SettingTransitionItem>
    </div>
  );
});

export default PageFun;
