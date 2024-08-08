import { useDispatch } from 'react-redux';
import ButtonIcon from '@/components/custom/button-icon';
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
    ></ButtonIcon>
  );
});

export default ThemeButton;
