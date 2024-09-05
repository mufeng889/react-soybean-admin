import HorizontalMix from './modules/HorizontalMix';
import VerticalMixMenu from './modules/VerticalMix';
import HorizontalMenu from './modules/Horizontal';
import VerticalMenu from './modules/Vertical';
import ReversedHorizontalMix from './modules/ReversedHorizontalMix';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
  reverse: boolean;
}

const GlobalMenu: FC<Props> = memo(({ mode, reverse }) => {
  const componentsMap = useMemo(
    () => ({
      vertical: <VerticalMenu />,
      'vertical-mix': <VerticalMixMenu />,
      horizontal: <HorizontalMenu />,
      'horizontal-mix': reverse ? <ReversedHorizontalMix /> : <HorizontalMix />
    }),
    [reverse]
  );

  return componentsMap[mode];
});

export default GlobalMenu;
