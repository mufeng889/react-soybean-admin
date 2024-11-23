import React from 'react';

import ButtonIcon from '../custom/ButtonIcon';
import SvgIcon from '../custom/SvgIcon';

interface Props {
  className: string;
  onClick?: React.ComponentProps<'button'>['onClick'];
  pin?: boolean;
}
const PinToggler: FC<Props> = memo(({ className, onClick, pin }) => {
  const { t } = useTranslation();

  const icon = pin ? 'mdi-pin-off' : 'mdi-pin';
  return (
    <ButtonIcon
      triggerParent
      className={className}
      tooltipContent={pin ? t('icon.unpin') : t('icon.pin')}
      tooltipPlacement="bottomLeft"
      onClick={onClick}
    >
      <SvgIcon icon={icon} />
    </ButtonIcon>
  );
});

export default PinToggler;
