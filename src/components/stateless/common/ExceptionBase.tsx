import { Button } from 'antd';
import SvgIcon from '../custom/SvgIcon';

type ExceptionType = '403' | '404' | '500';

interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType;
}
const iconMap: Record<ExceptionType, string> = {
  '403': 'no-permission',
  '404': 'not-found',
  '500': 'service-error'
};
const ExceptionBase: FC<Props> = memo(({ type }) => {
  const { t } = useTranslation();
  const nav = useNavigate();

  const onClick = () => {
    nav('/');
  };

  return (
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon={iconMap[type]} />
      </div>
      <Button
        onClick={onClick}
        type="primary"
      >
        {t('common.backToHome')}
      </Button>
    </div>
  );
});

export default ExceptionBase;
