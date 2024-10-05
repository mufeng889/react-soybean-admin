import { Button, Form, Input, Space } from 'antd';

interface FormModel {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const Component = () => {
  const { t } = useTranslation();
  const { toggleLoginModule } = useRouterPush();
  const [form] = Form.useForm<FormModel>();
  const { formRules, createConfirmPwdRule } = useFormRules();

  async function handleSubmit() {
    const params = await form.validateFields();
    console.log(params);

    // request to reset password
    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  useKeyPress('enter', () => {
    handleSubmit();
  });

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.register.title')}</h3>
      <Form
        form={form}
        className="pt-24px"
      >
        <Form.Item
          name="phone"
          rules={formRules.phone}
        >
          <Input placeholder={t('page.login.common.phonePlaceholder')}></Input>
        </Form.Item>
        <Form.Item
          name="code"
          rules={formRules.code}
        >
          <Input placeholder={t('page.login.common.codePlaceholder')}></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={formRules.pwd}
        >
          <Input.Password
            autoComplete="password"
            placeholder={t('page.login.common.passwordPlaceholder')}
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={createConfirmPwdRule(form)}
        >
          <Input.Password
            autoComplete="confirm-password"
            placeholder={t('page.login.common.confirmPasswordPlaceholder')}
          ></Input.Password>
        </Form.Item>
        <Space
          direction="vertical"
          className="w-full"
          size={18}
        >
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </Button>

          <Button
            size="large"
            shape="round"
            block
            onClick={() => toggleLoginModule('pwd-login')}
          >
            {t('page.login.common.back')}
          </Button>
        </Space>
      </Form>
    </>
  );
};

Component.displayName = 'ResetPwd';
