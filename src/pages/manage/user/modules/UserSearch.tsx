import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import type { FormInstance } from 'antd';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

interface Props {
  reset: () => void;
  search: () => void;
  form: FormInstance;
}

const UserSearch: FC<Props> = memo(({ reset, search, form }) => {
  const { t } = useTranslation();
  const {
    patternRules: { email, phone }
  } = useFormRules();

  return (
    <Form
      labelCol={{
        span: 5,
        md: 7
      }}
      form={form}
    >
      <Row
        gutter={[16, 16]}
        wrap
      >
        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            className="m-0"
            name="userName"
            label={t('page.manage.user.userName')}
          >
            <Input placeholder={t('page.manage.user.form.userName')} />
          </Form.Item>
        </Col>

        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            className="m-0"
            name="userGender"
            label={t('page.manage.user.userGender')}
          >
            <Select
              placeholder={t('page.manage.user.form.userGender')}
              allowClear
              options={translateOptions(userGenderOptions)}
            />
          </Form.Item>
        </Col>

        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            className="m-0"
            name="nickName"
            label={t('page.manage.user.nickName')}
          >
            <Input placeholder={t('page.manage.user.form.nickName')} />
          </Form.Item>
        </Col>

        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            rules={[phone]}
            className="m-0"
            name="userPhone"
            label={t('page.manage.user.userPhone')}
          >
            <Input placeholder={t('page.manage.user.form.userPhone')} />
          </Form.Item>
        </Col>

        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            rules={[email]}
            className="m-0"
            name="userEmail"
            label={t('page.manage.user.userEmail')}
          >
            <Input placeholder={t('page.manage.user.form.userEmail')} />
          </Form.Item>
        </Col>

        <Col
          span={24}
          md={12}
          lg={6}
        >
          <Form.Item
            className="m-0"
            name="userStatus"
            label={t('page.manage.user.userStatus')}
          >
            <Select
              placeholder={t('page.manage.user.form.userStatus')}
              allowClear
              options={translateOptions(enableStatusOptions)}
            />
          </Form.Item>
        </Col>

        <Col
          lg={12}
          span={24}
        >
          <Form.Item className="m-0">
            <Flex
              gap={12}
              align="center"
              justify="end"
            >
              <Button
                icon={<IconIcRoundRefresh />}
                onClick={reset}
              >
                {t('common.reset')}
              </Button>
              <Button
                icon={<IconIcRoundSearch />}
                type="primary"
                ghost
                onClick={search}
              >
                {t('common.search')}
              </Button>
            </Flex>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default UserSearch;
