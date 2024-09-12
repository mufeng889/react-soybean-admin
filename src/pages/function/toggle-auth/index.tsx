import { Button, Card, Descriptions, Space, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useLoading } from '@sa/hooks';
import { selectUserInfo } from '@/store/slice/auth';
import { reloadPage } from '@/store/slice/app';

import { initTabStore } from '@/store/slice/tab';
import { router } from '@/router';
import { useLogin } from '@/hooks/common/login';

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

export function Component() {
  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo);

  const { hasAuth } = useAuth();
  const { toLogin } = useLogin();
  const { loading, startLoading, endLoading } = useLoading();

  const dispatch = useAppDispatch();

  const [loginAccount, setLoginAccount] = useState<AccountKey>('super');

  const accounts: Account[] = [
    {
      key: 'super',
      label: t('page.login.pwdLogin.superAdmin'),
      userName: 'Super',
      password: '123456'
    },
    {
      key: 'admin',
      label: t('page.login.pwdLogin.admin'),
      userName: 'Admin',
      password: '123456'
    },
    {
      key: 'user',
      label: t('page.login.pwdLogin.user'),
      userName: 'User',
      password: '123456'
    }
  ];

  const roles: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('page.manage.user.userRole'),
      children: (
        <Space>
          {userInfo.roles.map(role => (
            <Tag key={role}>{role}</Tag>
          ))}
        </Space>
      )
    },
    {
      key: '2',
      label: t('page.function.toggleAuth.toggleAccount'),
      children: (
        <Space>
          {accounts.map(account => (
            <Button
              disabled={loading && loginAccount !== account.key}
              loading={loading && loginAccount === account.key}
              key={account.key}
              onClick={() => handleToggleAccount(account)}
            >
              {account.label}
            </Button>
          ))}
        </Space>
      )
    }
  ];

  async function handleToggleAccount(account: Account) {
    setLoginAccount(account.key);

    startLoading();

    router.resetRoute();

    await toLogin({ userName: account.userName, password: account.password }, false);

    dispatch(initTabStore());

    endLoading();

    dispatch(reloadPage());
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
        <Descriptions
          bordered
          layout="vertical"
          size="small"
          column={1}
          items={roles}
        />
        <Card
          title={t('page.function.toggleAuth.authHook')}
          bordered={false}
          className="card-wrapper"
          size="small"
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
