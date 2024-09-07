import classNames from 'classnames';
import type { ButtonTabProps } from '../../types';
import styles from './index.module.css';
import { useTap } from './hook';
const ButtonTab = ({
  darkMode,
  active,
  prefix,
  suffix,
  children,
  className,
  onClick,
  style,
  ...rest
}: ButtonTabProps) => {
  const tap = useTap(onClick);

  return (
    <div
      {...rest}
      {...tap}
      className={classNames(
        ':soy: relative inline-flex cursor-pointer items-center justify-center gap-12px whitespace-nowrap border-(1px solid) rounded-4px px-12px py-4px',
        [
          styles['button-tab'],
          { [styles['button-tab_dark']]: darkMode },
          { [styles['button-tab_active']]: active },
          { [styles['button-tab_active_dark']]: active && darkMode },
          className
        ]
      )}
      onClick={onClick}
      style={{ ...style }}
    >
      {prefix}
      {children}
      {suffix}
    </div>
  );
};
export default ButtonTab;
