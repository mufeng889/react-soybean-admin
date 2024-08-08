import type { CSSProperties } from 'react';
import { Icon } from '@iconify/react';
/**
 * Props
 *
 * - Support iconify and local svg icon
 * - If icon and localIcon are passed at the same time, localIcon will be rendered first
 */
interface Props {
  /** Iconify icon name */
  icon?: string;
  /** Local svg icon name */
  localIcon?: string;
  style?: CSSProperties;
  className?: string;
}

const defaultLocalIcon = 'no-icon';
const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env;
const symbolId = (localIcon: string = defaultLocalIcon) => {
  const iconName = localIcon || defaultLocalIcon;

  return `#${prefix}-${iconName}`;
};
const SvgIcon = ({ icon, localIcon, ...props }: Props) => {
  /** If localIcon is passed, render localIcon first */
  return localIcon || !icon ? (
    <svg
      width="1em"
      height="1em"
      {...props}
      aria-hidden="true"
    >
      <use
        href={symbolId(localIcon)}
        fill="currentColor"
      />
    </svg>
  ) : (
    <Icon
      icon={icon}
      {...props}
    />
  );
};

export default SvgIcon;
