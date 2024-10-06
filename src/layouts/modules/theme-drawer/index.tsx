import { Drawer } from 'antd';
import { SimpleScrollbar } from '@sa/materials';
import { closeThemeDrawer, getThemeDrawerVisible } from '@/store/slice/app';
import DarkMode from './modules/DarkMode';
import ThemeColor from './modules/ThemeColor';
import LayoutMode from './modules/LayoutMode';
import PageFun from './modules/PageFun';
import ConfigOperation from './modules/ConfigOperation';

const ThemeDrawer = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const themeDrawerVisible = useAppSelector(getThemeDrawerVisible);

  function close() {
    dispatch(closeThemeDrawer());
  }

  return (
    <Drawer
      open={themeDrawerVisible}
      title={t('theme.themeDrawerTitle')}
      closeIcon={false}
      styles={{ body: { padding: 0 } }}
      onClose={close}
      extra={
        <ButtonIcon
          icon="ant-design:close-outlined"
          className="h-28px"
          onClick={close}
        />
      }
      footer={<ConfigOperation />}
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
    </Drawer>
  );
});

export default ThemeDrawer;
