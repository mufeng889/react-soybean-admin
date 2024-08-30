import { useSvgIconRender } from '@sa/hooks';
import SvgIcon from '@/components/stateless/custom/svg-icon';

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon);

  return {
    SvgIconVNode
  };
}
