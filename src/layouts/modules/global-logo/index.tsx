import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import ClassNames from 'classnames';
import SystemLogo from '@/components/stateless/common/SystemLogo';
interface Props extends Omit<LinkProps, 'to'> {
  /** Whether to show the title */
  showTitle?: boolean;
}
const GlobalLogo: FC<Props> = memo(({ className, showTitle = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      className={ClassNames('w-full flex-center nowrap-hidden', className)}
      {...props}
    >
      <SystemLogo className="text-32px text-primary" />
      <h2
        style={{ display: showTitle ? 'block' : 'none' }}
        className="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out"
      >
        {t('system.title')}
      </h2>
    </Link>
  );
});

export default GlobalLogo;
