import { getSiderCollapse, toggleSiderCollapse } from '@/store/slice/app';
import ButtonIcon from '../stateless/custom/ButtonIcon';
import SvgIcon from '../stateless/custom/SvgIcon';

interface Props {
  /** Arrow style icon */
  arrowIcon?: boolean;
  className?: string;
}

type NumberBool = 0 | 1;

const icons: Record<NumberBool, Record<NumberBool, string>> = {
  0: {
    0: 'line-md:menu-fold-left',
    1: 'line-md:menu-fold-right'
  },
  1: {
    0: 'ph-caret-double-left-bold',
    1: 'ph-caret-double-right-bold'
  }
};

const MenuToggler: FC<Props> = memo(({ arrowIcon, className }) => {
  const { t } = useTranslation();

  const siderCollapse = useAppSelector(getSiderCollapse);
  const dispatch = useAppDispatch();

  const isArrowIcon = Number(arrowIcon || false) as NumberBool;
  const isCollapsed = Number(siderCollapse || false) as NumberBool;
  const icon = icons[isArrowIcon][isCollapsed];

  return (
    <ButtonIcon
      onClick={() => dispatch(toggleSiderCollapse())}
      className={className}
      tooltipContent={siderCollapse ? t('icon.expand') : t('icon.collapse')}
      tooltipPlacement="bottomLeft"
    >
      <SvgIcon icon={icon} />
    </ButtonIcon>
  );
});

export default MenuToggler;
