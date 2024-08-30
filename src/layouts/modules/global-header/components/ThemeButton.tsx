import { useDispatch } from 'react-redux';
import { openThemeDrawer } from '@/store/slice/app';

const ThemeButton = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <ButtonIcon
      icon="majesticons:color-swatch-line"
      tooltipContent={t('icon.themeConfig')}
      triggerParent
      onClick={() => dispatch(openThemeDrawer())}
    />
  );
});

export default ThemeButton;
