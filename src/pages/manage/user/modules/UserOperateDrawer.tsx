import { Button, Drawer, Flex, Form, Input, Radio, Select } from 'antd';
import type { FC } from 'react';
import { useRequest } from '@sa/hooks';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { fetchGetAllRoles } from '@/service/api';

interface OptionsProps {
  label: string;
  value: string;
}

function getOptions(item: Api.SystemManage.AllRole) {
  return {
    label: item.roleName,
    value: item.roleCode
  };
}

const UserOperateDrawer: FC<Page.OperateDrawerProps> = ({ open, onClose, form, operateType, handleSubmit }) => {
  const { t } = useTranslation();

  const { data, run } = useRequest(fetchGetAllRoles, {
    manual: true
  });

  const roleOptions: OptionsProps[] = data ? data.map(getOptions) : [];

  useUpdateEffect(() => {
    if (open) {
      run();
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
