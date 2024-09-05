import Vertical from './Vertical';
import Horizontal from './Horizontal';

const ReversedHorizontalMix = () => {
  return [
    <Vertical key="vertical" />,
    <Horizontal
      key="ReversedHorizontalMix "
      mode="3"
    />
  ];
};

export default ReversedHorizontalMix;
