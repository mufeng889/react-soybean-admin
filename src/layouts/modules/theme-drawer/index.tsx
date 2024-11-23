import { SimpleScrollbar } from '@sa/materials';

import { closeThemeDrawer, getThemeDrawerVisible } from '@/store/slice/app';

import ConfigOperation from './modules/ConfigOperation';
import DarkMode from './modules/DarkMode';
import LayoutMode from './modules/LayoutMode';
import PageFun from './modules/PageFun';
import ThemeColor from './modules/ThemeColor';

const ThemeDrawer = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const themeDrawerVisible = useAppSelector(getThemeDrawerVisible);

  function close() {
    dispatch(closeThemeDrawer());
  }

  return (
    <ADrawer
      closeIcon={false}
      footer={<ConfigOperation />}
      open={themeDrawerVisible}
      styles={{ body: { padding: 0 } }}
      title={t('theme.themeDrawerTitle')}
      extra={
        <ButtonIcon
          className="h-28px"
          icon="ant-design:close-outlined"
          onClick={close}
        />
      }
      onClose={close}
    >
      <SimpleScrollbar>
        <div className="overflow-x-hidden px-24px pb-24px pt-8px">
          <ADivider>{t('theme.themeSchema.title')}</ADivider>
          <DarkMode />
          <ADivider>{t('theme.layoutMode.title')}</ADivider>
          <LayoutMode />
          <ADivider>{t('theme.themeColor.title')}</ADivider>
          <ThemeColor />
          <ADivider>{t('theme.pageFunTitle')}</ADivider>
          <PageFun />
        </div>
      </SimpleScrollbar>
    </ADrawer>
  );
});

export default ThemeDrawer;
