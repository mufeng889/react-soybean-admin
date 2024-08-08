import { Button, Drawer, Flex, Form, Input, Radio, Select } from 'antd';
import type { FC } from 'react';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { fetchGetAllRoles } from '@/service/api';

interface Props {
  open: boolean;
  /** the type of operation */
  operateType: AntDesign.TableOperateType;
  closeDrawer: () => void;
  submitted: () => void;
  /** the edit row data */
  rowData?: Api.SystemManage.User;
}

type Model = Pick<
  Api.SystemManage.User,
  'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'userRoles' | 'status'
>;

interface OptionsProps {
  label: string;
  value: string;
}

const UserOperateDrawer: FC<Props> = ({ open, closeDrawer, submitted, operateType, rowData }) => {
  const { t } = useTranslation();

  const [roleOptions, setRoleOptions] = useState<OptionsProps[]>([]);

  const [form] = Form.useForm<Model>();

  const onClose = () => {
    closeDrawer();
  };

  async function getRoleOptions() {
    const { error, data } = await fetchGetAllRoles();

    if (!error) {
      const options = data.map(item => ({
        label: item.roleName,
        value: item.roleCode
      }));

      // end
      setRoleOptions(options);
    }
  }

  async function handleSubmit() {
    const data = await form.validateFields();
    console.log(data);

    // request
    window.$message?.success(t('common.updateSuccess'));
    closeDrawer();
    submitted();
  }

  useUpdateEffect(() => {
    if (open) {
      form.resetFields();
      getRoleOptions();
    }
  }, [open]);

  return (
    <Drawer
      onClose={onClose}
      title={operateType === 'add' ? t('page.manage.user.addUser') : t('page.manage.user.editUser')}
      open={open}
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button
            onClick={handleSubmit}
            type="primary"
          >
            {t('common.confirm')}
          </Button>
        </Flex>
      }
    >
      <Form
        form={form}
        initialValues={operateType === 'edit' ? rowData : undefined}
        layout="vertical"
      >
        <Form.Item
          label={t('page.manage.user.userName')}
          name="userName"
        >
          <Input placeholder={t('page.manage.user.form.userName')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userGender')}
          name="userGender"
        >
          <Radio.Group>
            {userGenderOptions.map(item => (
              <Radio
                value={item.value}
                key={item.value}
              >
                {t(item.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.nickName')}
          name="nickName"
        >
          <Input placeholder={t('page.manage.user.form.nickName')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userPhone')}
          name="userPhone"
        >
          <Input placeholder={t('page.manage.user.form.userPhone')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userEmail')}
          name="email"
        >
          <Input placeholder={t('page.manage.user.form.userEmail')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userStatus')}
          name="status"
        >
          <Radio.Group>
            {enableStatusOptions.map(item => (
              <Radio
                value={item.value}
                key={item.value}
              >
                {t(item.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userRole')}
          name="roles"
        >
          <Select
            options={roleOptions}
            placeholder={t('page.manage.user.form.userRole')}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserOperateDrawer;
