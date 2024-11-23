import HorizontalMenu from './modules/Horizontal';
import HorizontalMix from './modules/HorizontalMix';
import ReversedHorizontalMix from './modules/ReversedHorizontalMix';
import VerticalMenu from './modules/Vertical';
import VerticalMixMenu from './modules/VerticalMix';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
  reverse: boolean;
}

const GlobalMenu: FC<Props> = memo(({ mode, reverse }) => {
  const componentsMap = useMemo(
    () => ({
      horizontal: <HorizontalMenu />,
      'horizontal-mix': reverse ? <ReversedHorizontalMix /> : <HorizontalMix />,
      vertical: <VerticalMenu />,
      'vertical-mix': <VerticalMixMenu />
    }),
    [reverse]
  );

  return componentsMap[mode];
});

export default GlobalMenu;
