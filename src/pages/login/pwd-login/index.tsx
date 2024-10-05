import { Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import { loginModuleRecord } from '@/constants/app';
import { useLogin } from '@/hooks/common/login';

type AccountKey = 'super' | 'admin' | 'user';
interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

type LoginParams = Pick<Account, 'userName' | 'password'>;

export function Component() {
  const [form] = Form.useForm<LoginParams>();
  const { toggleLoginModule } = useRouterPush();
  const { t } = useTranslation();
  const { loading, toLogin } = useLogin();

  const {
    formRules: { userName: userNameRules, pwd }
  } = useFormRules();

  async function handleSubmit() {
    const params = await form.validateFields();
    toLogin(params);
  }

  useKeyPress('enter', () => {
    handleSubmit();
  });

  function handleAccountLogin(account: Account) {
    toLogin(account);
  }

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

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
      <Form
        className="pt-24px"
        form={form}
        initialValues={{
          userName: 'Soybean',
          password: '123456'
        }}
      >
        <Form.Item
          rules={userNameRules}
          name="userName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={pwd}
          name="password"
        >
          <Input.Password autoComplete="password" />
        </Form.Item>
        <Space
          direction="vertical"
          className="w-full"
          size={24}
        >
          <div className="flex-y-center justify-between">
            <Checkbox>{t('page.login.pwdLogin.rememberMe')}</Checkbox>

            <Button
              type="text"
              onClick={() => toggleLoginModule('reset-pwd')}
            >
              {t('page.login.pwdLogin.forgetPassword')}
            </Button>
          </div>
          <Button
            type="primary"
            size="large"
            loading={loading}
            shape="round"
            onClick={handleSubmit}
            block
          >
            {t('common.confirm')}
          </Button>
          <div className="flex-y-center justify-between gap-12px">
            <Button
              className="flex-1"
              block
              onClick={() => toggleLoginModule('code-login')}
            >
              {t(loginModuleRecord['code-login'])}
            </Button>
            <Button
              className="flex-1"
              block
              onClick={() => toggleLoginModule('register')}
            >
              {t(loginModuleRecord.register)}
            </Button>
          </div>
          <Divider className="!m-0 !text-14px !text-#666">{t('page.login.pwdLogin.otherAccountLogin')}</Divider>
          <div className="flex-center gap-12px">
            {accounts.map(item => {
              return (
                <Button
                  key={item.key}
                  onClick={() => handleAccountLogin(item)}
                  type="primary"
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </Space>
      </Form>
    </>
  );
}
