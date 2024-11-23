import { Button, Tooltip } from 'antd';
import type { ButtonProps, TooltipProps } from 'antd';
import { type CSSProperties } from 'react';

import SvgIcon from './SvgIcon';

interface Props extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  children?: React.ReactNode;
  /** Button class */
  className?: string;
  /** Iconify icon name */
  icon?: string;
  style?: CSSProperties;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: TooltipProps['placement'];
  /** Trigger tooltip on parent */
  triggerParent?: boolean;
  zIndex?: number;
}

/** - 动态计算class */
const computeClass = (className: string) => {
  let clsStr = className;

  if (!clsStr.includes('h-')) {
    clsStr += ' h-36px';
  }

  if (!clsStr.includes('text-')) {
    clsStr += ' text-icon';
  }

  return clsStr;
};

/** - 生成复用的button */

const ButtonIcon: FC<Props> = memo(
  ({
    children,
    className = 'h-36px text-icon',
    icon,
    style,
    tooltipContent,
    tooltipPlacement = 'bottom',
    triggerParent,
    zIndex = 98,
    ...rest
  }) => {
    const cls = computeClass(className);

    function getPopupContainer(triggerNode: HTMLElement) {
      return triggerParent ? triggerNode.parentElement! : document.body;
    }

    return (
      <Tooltip
        getPopupContainer={getPopupContainer}
        placement={tooltipPlacement}
        title={tooltipContent}
        zIndex={zIndex}
      >
        <Button
          className={cls}
          type="text"
          {...rest}
        >
          <div className="flex-center gap-8px">
            {children || (
              <SvgIcon
                icon={icon}
                style={style}
              />
            )}
          </div>
        </Button>
      </Tooltip>
    );
  }
);

export default ButtonIcon;
