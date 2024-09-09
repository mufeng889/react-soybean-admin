import { Button, Card, Space } from 'antd';
import { fetchCustomBackendError } from '@/service/api';

export function Component() {
  const { t } = useTranslation();
  async function logout() {
    await fetchCustomBackendError('8888', t('request.logoutMsg'));
  }

  async function logoutWithModal() {
    await fetchCustomBackendError('7777', t('request.logoutWithModalMsg'));
  }

  async function refreshToken() {
    await fetchCustomBackendError('9999', t('request.tokenExpired'));
  }

  async function handleRepeatedMessageError() {
    await Promise.all([
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('2222', t('page.function.request.repeatedErrorMsg1')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2')),
      fetchCustomBackendError('3333', t('page.function.request.repeatedErrorMsg2'))
    ]);
  }
  async function handleRepeatedModalError() {
    await Promise.all([
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg')),
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg')),
      fetchCustomBackendError('7777', t('request.logoutWithModalMsg'))
    ]);
  }

  return (
    <Space
      direction="vertical"
      size={16}
      className="w-full"
    >
      <Card
        title={t('request.logout')}
        bordered={false}
        className="card-wrapper"
        size="small"
      >
        <Button onClick={logout}>{t('common.trigger')}</Button>
      </Card>

      <Card
        title={t('request.logoutWithModal')}
        bordered={false}
        className="card-wrapper"
        size="small"
      >
        <Button onClick={logoutWithModal}>{t('common.trigger')}</Button>
      </Card>

      <Card
        title={t('request.refreshToken')}
        bordered={false}
        className="card-wrapper"
        size="small"
      >
        <Button onClick={refreshToken}>{t('common.trigger')}</Button>
      </Card>

      <Card
        title={t('page.function.request.repeatedErrorOccurOnce')}
        bordered={false}
        className="card-wrapper"
        size="small"
      >
        <Button onClick={handleRepeatedMessageError}>{t('page.function.request.repeatedError')} (Message)</Button>
        <Button
          className="ml-12px"
          onClick={handleRepeatedModalError}
        >
          {t('page.function.request.repeatedError')}(Modal)
        </Button>
      </Card>
    </Space>
  );
}
