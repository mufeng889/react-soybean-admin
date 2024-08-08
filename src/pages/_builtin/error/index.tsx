import { useRouteError } from 'react-router-dom';
import { Button, Typography } from 'antd';
import SvgIcon from '@/components/custom/svg-icon';

const { Title, Text } = Typography;
const ErrorPage = () => {
  const error = useRouteError() as Error;
  const { t } = useTranslation();
  console.error(error);

  return (
    <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="service-error" />
      </div>
      <Button type="primary">{t('common.backToHome')}</Button>
      <Title
        className="m-0"
        level={5}
      >
        你的错误是
      </Title>
      <Text code>{error.message}</Text>
    </div>
  );
};

export default ErrorPage;
