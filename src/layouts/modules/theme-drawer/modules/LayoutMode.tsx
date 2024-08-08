import { Divider } from 'antd';
import ClassNames from 'classnames';
import LayoutModeCard from '../components/LayoutModeCard';
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
  const { t } = useTranslation();

  return (
    <>
      <Divider>{t('theme.layoutMode.title')}</Divider>
      <LayoutModeCard {...LAYOUTS_COMPONENTS} />
    </>
  );
});

export default LayoutMode;
