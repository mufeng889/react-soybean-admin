import Horizontal from './Horizontal';
import Vertical from './Vertical';

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
