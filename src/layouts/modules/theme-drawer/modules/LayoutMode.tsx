import ClassNames from 'classnames';
import { changeReverseHorizontalMix, getThemeSettings } from '@/store/slice/theme';
import LayoutModeCard from '../components/LayoutModeCard';
import SettingItem from '../components/SettingItem';
import style from './layoutMode.module.scss';

const LAYOUTS_COMPONENTS: Record<UnionKey.ThemeLayoutMode, React.ReactNode> = {
  vertical: (
    <>
      <div className={ClassNames('h-full w-18px', style['layout-sider'])}></div>
      <div className={style['vertical-wrapper']}>
        <div className={style['layout-header']}></div>
        <div className={style['layout-main']}></div>
      </div>
    </>
  ),
  'vertical-mix': (
    <>
      <div className={ClassNames('h-full w-8px', style['layout-sider'])}></div>
      <div className={ClassNames('h-full w-16px', style['layout-sider'])}></div>
      <div className={style['vertical-wrapper']}>
        <div className={style['layout-header']}></div>
        <div className={style['layout-main']}></div>
      </div>
    </>
  ),
  horizontal: (
    <>
      <div className={style['layout-header']}></div>
      <div className={style['horizontal-wrapper']}>
        <div className={style['layout-main']}></div>
      </div>
    </>
  ),
  'horizontal-mix': (
    <>
      <div className={style['layout-header']}></div>
      <div className={style['horizontal-wrapper']}>
        <div className={ClassNames('w-18px', style['layout-sider'])}></div>
        <div className={style['layout-main']}></div>
      </div>
    </>
  )
};

const LayoutMode = memo(() => {
  const themeSettings = useAppSelector(getThemeSettings);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function toggleReverseHorizontalMix(checked: boolean) {
    dispatch(changeReverseHorizontalMix(checked));
  }

  return (
    <>
      <LayoutModeCard
        mode={themeSettings.layout.mode}
        {...LAYOUTS_COMPONENTS}
      />

      <SettingItem
        seq={1}
        show={themeSettings.layout.mode === 'horizontal-mix'}
        className="mt-16px"
        label={t('theme.layoutMode.reverseHorizontalMix')}
      >
        <ASwitch
          defaultChecked={themeSettings.layout.reverseHorizontalMix}
          onChange={toggleReverseHorizontalMix}
        />
      </SettingItem>
    </>
  );
});

export default LayoutMode;
