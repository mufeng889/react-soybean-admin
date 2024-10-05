import { Button, Form, Input, Space } from 'antd';

export const Component = () => {
  const [form] = Form.useForm();
  const { label, isCounting, loading, getCaptcha } = useCaptcha();
  const { t } = useTranslation();
  const { toggleLoginModule } = useRouterPush();
  const { formRules } = useFormRules();

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
      <h3 className="text-18px text-primary font-medium">{t('page.login.codeLogin.title')}</h3>
      <Form
        className="pt-24px"
        form={form}
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
          <div className="w-full flex-y-center gap-16px">
            <Input
              v-model:value="model.code"
              placeholder={t('page.login.common.codePlaceholder')}
            />
            <Button
              size="large"
              disabled={isCounting}
              loading={loading}
              onClick={() => getCaptcha('17260760167')}
            >
              {label}
            </Button>
          </div>
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

Component.displayName = 'CodeLogin';
