import { useLoading } from '@sa/hooks';
import { Button, Card, Descriptions, Space, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';

import { useLogin } from '@/hooks/common/login';
import { router } from '@/router';
import { reloadPage } from '@/store/slice/app';
import { selectUserInfo } from '@/store/slice/auth';
import { initTabStore } from '@/store/slice/tab';

type AccountKey = 'admin' | 'super' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  password: string;
  userName: string;
}

export function Component() {
  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo);

  const { hasAuth } = useAuth();
  const { toLogin } = useLogin();
  const { endLoading, loading, startLoading } = useLoading();

  const dispatch = useAppDispatch();

  const [loginAccount, setLoginAccount] = useState<AccountKey>('super');

  const accounts: Account[] = [
    {
      key: 'super',
      label: t('page.login.pwdLogin.superAdmin'),
      password: '123456',
      userName: 'Super'
    },
    {
      key: 'admin',
      label: t('page.login.pwdLogin.admin'),
      password: '123456',
      userName: 'Admin'
    },
    {
      key: 'user',
      label: t('page.login.pwdLogin.user'),
      password: '123456',
      userName: 'User'
    }
  ];

  const roles: DescriptionsProps['items'] = [
    {
      children: (
        <Space>
          {userInfo.roles.map(role => (
            <Tag key={role}>{role}</Tag>
          ))}
        </Space>
      ),
      key: '1',
      label: t('page.manage.user.userRole')
    },
    {
      children: (
        <Space>
          {accounts.map(account => (
            <Button
              disabled={loading && loginAccount !== account.key}
              key={account.key}
              loading={loading && loginAccount === account.key}
              onClick={() => handleToggleAccount(account)}
            >
              {account.label}
            </Button>
          ))}
        </Space>
      ),
      key: '2',
      label: t('page.function.toggleAuth.toggleAccount')
    }
  ];

  async function handleToggleAccount(account: Account) {
    setLoginAccount(account.key);

    startLoading();

    router.resetRoute();

    await toLogin({ password: account.password, userName: account.userName }, false);

    dispatch(initTabStore());

    endLoading();

    dispatch(reloadPage());
  }
  return (
    <Space
      className="w-full"
      direction="vertical"
      size={16}
    >
      <Card
        bordered={false}
        className="card-wrapper"
        size="small"
        title={t('request.logout')}
      >
        <Descriptions
          bordered
          column={1}
          items={roles}
          layout="vertical"
          size="small"
        />
        <Card
          bordered={false}
          className="card-wrapper"
          size="small"
          title={t('page.function.toggleAuth.authHook')}
        >
          <Space>
            {hasAuth('B_CODE1') && <Button>{t('page.function.toggleAuth.superAdminVisible')}</Button>}
            {hasAuth('B_CODE2') && <Button>{t('page.function.toggleAuth.adminVisible')}</Button>}
            {hasAuth('B_CODE3') && <Button>{t('page.function.toggleAuth.adminOrUserVisible')}</Button>}
          </Space>
        </Card>
      </Card>
    </Space>
  );
}
