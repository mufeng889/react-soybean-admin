import type { TooltipProps } from 'antd';
import ClassNames from 'classnames';
import { Tooltip } from 'antd';
import { themeLayoutModeRecord } from '@/constants/app';
import { setLayoutMode } from '@/store/slice/theme';
import { getIsMobile } from '@/store/slice/app';

type LayoutConfig = Record<
  UnionKey.ThemeLayoutMode,
  {
    placement: TooltipProps['placement'];
    headerClass: string;
    menuClass: string;
    mainClass: string;
  }
>;

const LAYOUT_CONFIG: LayoutConfig = {
  vertical: {
    placement: 'bottom',
    headerClass: '',
    menuClass: 'w-1/3 h-full',
    mainClass: 'w-2/3 h-3/4'
  },
  'vertical-mix': {
    placement: 'bottom',
    headerClass: '',
    menuClass: 'w-1/4 h-full',
    mainClass: 'w-2/3 h-3/4'
  },
  horizontal: {
    placement: 'bottom',
    headerClass: '',
    menuClass: 'w-full h-1/4',
    mainClass: 'w-full h-3/4'
  },
  'horizontal-mix': {
    placement: 'bottom',
    headerClass: '',
    menuClass: 'w-full h-1/4',
    mainClass: 'w-2/3 h-3/4'
  }
};

interface Props extends Record<UnionKey.ThemeLayoutMode, React.ReactNode> {
  mode: UnionKey.ThemeLayoutMode;
}

const LayoutModeCard: FC<Props> = memo(({ mode, ...rest }) => {
  const isMobile = useAppSelector(getIsMobile);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  function handleChangeMode(modeType: UnionKey.ThemeLayoutMode) {
    if (isMobile) return;

    dispatch(setLayoutMode(modeType));
  }

  return (
    <div className="flex-center flex-wrap gap-x-32px gap-y-16px">
      {Object.entries(LAYOUT_CONFIG).map(([key, item]) => (
        <div
          key={key}
          className={ClassNames('flex cursor-pointer border-2px rounded-6px hover:border-primary', [
            mode === key ? 'border-primary' : 'border-transparent'
          ])}
          onClick={() => handleChangeMode(key as UnionKey.ThemeLayoutMode)}
        >
          <Tooltip
            placement={item.placement}
            title={t(themeLayoutModeRecord[key as UnionKey.ThemeLayoutMode])}
          >
            <div
              className={ClassNames('h-64px w-96px gap-6px rd-4px p-6px shadow dark:shadow-coolGray-5', [
                key.includes('vertical') ? 'flex' : 'flex-col'
              ])}
            >
              {rest[key as UnionKey.ThemeLayoutMode]}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
});

export default LayoutModeCard;
