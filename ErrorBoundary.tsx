import { useNavigate, useRouteError } from 'react-router-dom';
import { Button, Typography } from 'antd';

import SvgIcon from '@/components/custom/svg-icon';

const { Title, Text } = Typography;
const ErrorPage = () => {
  const error = useRouteError() as Error;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  console.error(error);
  const handleRetry = () => {
    navigate(location.pathname + location.search, { replace: true, state: 'reload' });
  };

  return (
    <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="expectation" />
      </div>
      <Button
        onClick={handleRetry}
        type="primary"
      >
        {t('system.reload')}
      </Button>
      <Title
        className="m-0"
        level={5}
      >
        {t('system.errorReason')}
      </Title>
      <Text code>{error.message}</Text>
    </div>
  );
};

export default ErrorPage;
