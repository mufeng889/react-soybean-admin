import type { ButtonProps, TooltipProps } from 'antd';
import type { CSSProperties } from 'react';
import { getDarkMode, getThemeSettings, toggleThemeScheme } from '@/store/slice/theme';
import ButtonIcon from '../stateless/custom/ButtonIcon';

interface Props {
  /** Show tooltip */
  showTooltip?: boolean;
  /** Tooltip placement */
  tooltipPlacement?: TooltipProps['placement'];
  style?: CSSProperties;
  className?: string;
}

const icons: Record<UnionKey.ThemeScheme, string> = {
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto'
};

let dark: boolean = false;
const DEFAULT_ANIMATION_DURATION = 400;
const DEFAULT_ANIMATION_EASING = 'ease-out';

const ThemeSchemaSwitch: FC<Props> = memo(({ tooltipPlacement = 'bottom', showTooltip = true, ...props }) => {
  const { t } = useTranslation();
  const { themeScheme } = useAppSelector(getThemeSettings);
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(getDarkMode);

  const tooltipContent = showTooltip ? t('icon.themeSchema') : '';

  const toggleDark: ButtonProps['onClick'] = event => {
    const isAppearanceTransition = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      dispatch(toggleThemeScheme());
      return;
    }

    const transition = document.startViewTransition(async () => {
      dark = dispatch(toggleThemeScheme()) as boolean;
    });
    if (dark !== darkMode) return;
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath: darkMode ? [...clipPath].reverse() : clipPath
        },
        {
          duration: DEFAULT_ANIMATION_DURATION,
          easing: DEFAULT_ANIMATION_EASING,
          pseudoElement: darkMode ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      );
    });
  };
  return (
    <ButtonIcon
      icon={icons[themeScheme]}
      tooltipContent={tooltipContent}
      {...props}
      tooltipPlacement={tooltipPlacement}
      onClick={toggleDark}
    />
  );
});

export default ThemeSchemaSwitch;
