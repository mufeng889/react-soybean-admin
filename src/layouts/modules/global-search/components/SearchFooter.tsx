import classNames from 'classnames';
import { Divider } from 'antd';
import style from './footer.module.scss';

const SearchFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Divider className="my-2px" />
      <div className="h-44px flex-center gap-14px">
        <span className="flex-y-center">
          <IconMdiKeyboardReturn className={classNames(style['operate-shadow'], style['operate-item'])} />
          <span>{t('common.confirm')}</span>
        </span>
        <span className="flex-y-center">
          <IconMdiArrowUpThin className={classNames([style['operate-shadow'], style['operate-item']])} />
          <IconMdiArrowDownThin className={classNames(style['operate-shadow'], style['operate-item'])} />
          <span>{t('common.switch')}</span>
        </span>
        <span className="flex-y-center">
          <IconMdiKeyboardEsc className={classNames(style['operate-shadow'], style['operate-item'])} />
          <span>{t('common.close')}</span>
        </span>
      </div>
    </>
  );
};

export default memo(SearchFooter);
