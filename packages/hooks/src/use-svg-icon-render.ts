import { createElement } from 'react';

interface IconConfig {
  /** Iconify icon name */
  icon?: string;
  /** Local icon name */
  localIcon?: string;
  /** Icon color */
  color?: string;
  /** Icon size */
  fontSize?: number;
}
interface Props {
  /** Iconify icon name */
  icon?: string;
  /** Local svg icon name */
  localIcon?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Svg icon render hook
 *
 * @param SvgIcon Svg icon component
 */
export default function useSvgIconRender(SvgIcon: ({ icon, localIcon, style, className }: Props) => JSX.Element) {
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
