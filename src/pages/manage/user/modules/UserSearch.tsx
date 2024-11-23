import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';

import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

const UserSearch: FC<Page.SearchProps> = memo(({ form, reset, search }) => {
  const { t } = useTranslation();
  const {
    patternRules: { email, phone }
  } = useFormRules();

  return (
    <Form
      form={form}
      labelCol={{
        md: 7,
        span: 5
      }}
    >
      <Row
        wrap
        gutter={[16, 16]}
      >
        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.userName')}
            name="userName"
          >
            <Input placeholder={t('page.manage.user.form.userName')} />
          </Form.Item>
        </Col>

        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.userGender')}
            name="userGender"
          >
            <Select
              allowClear
              options={translateOptions(userGenderOptions)}
              placeholder={t('page.manage.user.form.userGender')}
            />
          </Form.Item>
        </Col>

        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.nickName')}
            name="nickName"
          >
            <Input placeholder={t('page.manage.user.form.nickName')} />
          </Form.Item>
        </Col>

        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.userPhone')}
            name="userPhone"
            rules={[phone]}
          >
            <Input placeholder={t('page.manage.user.form.userPhone')} />
          </Form.Item>
        </Col>

        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.userEmail')}
            name="userEmail"
            rules={[email]}
          >
            <Input placeholder={t('page.manage.user.form.userEmail')} />
          </Form.Item>
        </Col>

        <Col
          lg={6}
          md={12}
          span={24}
        >
          <Form.Item
            className="m-0"
            label={t('page.manage.user.userStatus')}
            name="userStatus"
          >
            <Select
              allowClear
              options={translateOptions(enableStatusOptions)}
              placeholder={t('page.manage.user.form.userStatus')}
            />
          </Form.Item>
        </Col>

        <Col
          lg={12}
          span={24}
        >
          <Form.Item className="m-0">
            <Flex
              align="center"
              gap={12}
              justify="end"
            >
              <Button
                icon={<IconIcRoundRefresh />}
                onClick={reset}
              >
                {t('common.reset')}
              </Button>
              <Button
                ghost
                icon={<IconIcRoundSearch />}
                type="primary"
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
