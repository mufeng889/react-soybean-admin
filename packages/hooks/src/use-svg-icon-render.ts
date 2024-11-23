import { createElement } from 'react';

interface IconConfig {
  /** Icon color */
  color?: string;
  /** Icon size */
  fontSize?: number;
  /** Iconify icon name */
  icon?: string;
  /** Local icon name */
  localIcon?: string;
}
interface Props {
  className?: string;
  /** Iconify icon name */
  icon?: string;
  /** Local svg icon name */
  localIcon?: string;
  style?: React.CSSProperties;
}

/**
 * Svg icon render hook
 *
 * @param SvgIcon Svg icon component
 */
export default function useSvgIconRender(SvgIcon: ({ className, icon, localIcon, style }: Props) => JSX.Element) {
  type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'fontSize'>>;

  /**
   * Svg icon VNode
   *
   * @param config
   */
  const SvgIconVNode = (config: IconConfig) => {
    const { color, fontSize, icon, localIcon } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    if (!icon && !localIcon) {
      return null;
    }

    return createElement(SvgIcon, { icon, localIcon, style });
  };

  return {
    SvgIconVNode
  };
}
