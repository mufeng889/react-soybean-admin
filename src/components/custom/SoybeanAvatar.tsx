import ClassNames from 'classnames';
import soybeanAvatar from '@/assets/imgs/soybean.jpg';
// eslint-disable-next-line react/prop-types
const SoybeanAvatar: FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={ClassNames('size-72px  overflow-hidden rd-1/2', className)}
    >
      <img
        src={soybeanAvatar}
        className="size-full"
      />
    </div>
  );
};

export default SoybeanAvatar;
