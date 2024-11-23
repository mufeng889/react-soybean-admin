import ClassNames from 'classnames';

import { changeReverseHorizontalMix, getThemeSettings } from '@/store/slice/theme';

import LayoutModeCard from '../components/LayoutModeCard';
import SettingItem from '../components/SettingItem';

import style from './layoutMode.module.scss';

const LAYOUTS_COMPONENTS: Record<UnionKey.ThemeLayoutMode, React.ReactNode> = {
  horizontal: (
    <>
      <div className={style['layout-header']} />
      <div className={style['horizontal-wrapper']}>
        <div className={style['layout-main']} />
      </div>
    </>
  ),
  'horizontal-mix': (
    <>
      <div className={style['layout-header']} />
      <div className={style['horizontal-wrapper']}>
        <div className={ClassNames('w-18px', style['layout-sider'])} />
        <div className={style['layout-main']} />
      </div>
    </>
  ),
  vertical: (
    <>
      <div className={ClassNames('h-full w-18px', style['layout-sider'])} />
      <div className={style['vertical-wrapper']}>
        <div className={style['layout-header']} />
        <div className={style['layout-main']} />
      </div>
    </>
  ),
  'vertical-mix': (
    <>
      <div className={ClassNames('h-full w-8px', style['layout-sider'])} />
      <div className={ClassNames('h-full w-16px', style['layout-sider'])} />
      <div className={style['vertical-wrapper']}>
        <div className={style['layout-header']} />
        <div className={style['layout-main']} />
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
        className="mt-16px"
        label={t('theme.layoutMode.reverseHorizontalMix')}
        seq={1}
        show={themeSettings.layout.mode === 'horizontal-mix'}
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
