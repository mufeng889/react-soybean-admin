import { useRouteError, useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { $t } from './src/locales'
import type { FallbackProps } from 'react-error-boundary'
import { localStg } from '@/utils/storage';


type Props = Partial<FallbackProps>;

const isDev = import.meta.env.DEV;

const { Title, Text } = Typography;

function HookSupportChecker() {
  try {
    // 尝试使用一个简单的 Hook

    const error = useRouteError() as Error;
    const nav = useNavigate()

    const update = () => {
      nav(0)
    }

    return { update, error }; // 如果没有抛出异常，则支持 Hook
  } catch (error) {
    return false; // 如果抛出异常，则不支持 Hook
  }
}

const theme = localStg.get('themeColor') || '#646cff'
const ErrorPage: FC<Props> = ({ error, resetErrorBoundary }) => {

  // 可以在这里根据不同的业务逻辑处理错误或者上报给日志服务
  const hook = HookSupportChecker()

  console.error(error);

  return (
    <div className="size-full min-h-520px flex-col-center gap-16px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="error" />
      </div>
      {isDev ? <Text code>{hook ? hook.error.message : error.message}</Text> : <Title level={3}>{$t('common.errorHint')}</Title>}
      <Button style={{ backgroundColor: theme }} type='primary' onClick={hook ? hook.update : resetErrorBoundary} >{$t('common.tryAlign')}</Button>
    </div>
  );
};

export default ErrorPage;
