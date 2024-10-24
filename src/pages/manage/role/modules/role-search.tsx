import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

const RoleSearch: FC<Page.SearchProps> = memo(({ reset, search, form }) => {
  const { t } = useTranslation();

  return (
    <AForm
      labelCol={{
        span: 5,
        md: 7
      }}
      form={form}
    >
      <ARow
        gutter={[16, 16]}
        wrap
      >
        <ACol
          span={24}
          md={12}
          lg={6}
        >
          <AForm.Item
            className="m-0"
            name="roleName"
            label={t('page.manage.role.roleName')}
          >
            <AInput placeholder={t('page.manage.role.form.roleName')} />
          </AForm.Item>
        </ACol>
        <ACol
          span={24}
          md={12}
          lg={6}
        >
          <AForm.Item
            className="m-0"
            name="roleCode"
            label={t('page.manage.role.roleCode')}
          >
            <AInput placeholder={t('page.manage.role.form.roleCode')} />
          </AForm.Item>
        </ACol>

        <ACol
          span={24}
          md={12}
          lg={6}
        >
          <AForm.Item
            className="m-0"
            name="status"
            label={t('page.manage.role.roleStatus')}
          >
            <ASelect
              placeholder={t('page.manage.user.form.userGender')}
              allowClear
              options={translateOptions(enableStatusOptions)}
            />
          </AForm.Item>
        </ACol>

        <ACol
          span={24}
          md={12}
          lg={6}
        >
          <AForm.Item className="m-0">
            <AFlex
              gap={12}
              align="center"
              justify="end"
            >
              <AButton
                icon={<IconIcRoundRefresh />}
                onClick={reset}
              >
                {t('common.reset')}
              </AButton>
              <AButton
                icon={<IconIcRoundSearch />}
                type="primary"
                ghost
                onClick={search}
              >
                {t('common.search')}
              </AButton>
            </AFlex>
          </AForm.Item>
        </ACol>
      </ARow>
    </AForm>
  );
});

export default RoleSearch;
