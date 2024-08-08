import { Button, Drawer, Flex, Form, Input, Radio, Select } from 'antd';
import type { FC } from 'react';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { fetchGetAllRoles } from '@/service/api';

interface Props {
  open: boolean;
  closeDrawer: () => void;
}

const UserOperateDrawer: FC<Props> = ({ open, closeDrawer }) => {
  const { t } = useTranslation();

  const onClose = () => {
    closeDrawer();
  };
  return (
    <Drawer
      onClose={onClose}
      open={open}
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="primary">{t('common.confirm')}</Button>
        </Flex>
      }
    >
      <Form layout="vertical">
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
          <Select placeholder={t('page.manage.user.form.userRole')} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserOperateDrawer;
