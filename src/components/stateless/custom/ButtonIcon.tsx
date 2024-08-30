import { Button, Tooltip } from 'antd';
import type { ButtonProps, TooltipProps } from 'antd';
import { type CSSProperties } from 'react';
import SvgIcon from './SvgIcon';

interface Props extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  /** Button class */
  className?: string;
  /** Iconify icon name */
  icon?: string;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: TooltipProps['placement'];
  zIndex?: number;
  style?: CSSProperties;
  /** Trigger tooltip on parent */
  triggerParent?: boolean;
  children?: React.ReactNode;
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
    className = 'h-36px text-icon',
    icon,
    tooltipContent,
    tooltipPlacement = 'bottom',
    zIndex = 98,
    style,
    triggerParent,
    children,
    ...rest
  }) => {
    const cls = computeClass(className);

    function getPopupContainer(triggerNode: HTMLElement) {
      return triggerParent ? triggerNode.parentElement! : document.body;
    }

    return (
      <Tooltip
        zIndex={zIndex}
        title={tooltipContent}
        placement={tooltipPlacement}
        getPopupContainer={getPopupContainer}
      >
        <Button
          type="text"
          className={cls}
          {...rest}
        >
          <div className="flex-center gap-8px">
            {children || (
              <SvgIcon
                style={style}
                icon={icon}
              />
            )}
          </div>
        </Button>
      </Tooltip>
    );
  }
);

export default ButtonIcon;
