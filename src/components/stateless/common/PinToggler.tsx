import React from 'react';
import ButtonIcon from '../custom/ButtonIcon';
import SvgIcon from '../custom/SvgIcon';
interface Props {
  pin?: boolean;
  onClick?: React.ComponentProps<'button'>['onClick'];
  className: string;
}
const PinToggler: FC<Props> = memo(({ pin, onClick, className }) => {
  const { t } = useTranslation();

  const icon = pin ? 'mdi-pin-off' : 'mdi-pin';
  return (
    <ButtonIcon
      tooltipContent={pin ? t('icon.unpin') : t('icon.pin')}
      tooltipPlacement="bottomLeft"
      triggerParent
      onClick={onClick}
      className={className}
    >
      <SvgIcon icon={icon} />
    </ButtonIcon>
  );
});

export default PinToggler;
