import { enableStatusOptions } from '@/constants/business';
import ButtonAuthModal from './button-auth-modal';
import MenuAuthModal from './menu-auth-modal';

type Props = Page.OperateDrawerProps & { rowId: number };

const RoleOperateDrawer: FC<Props> = memo(({ open, onClose, form, operateType, handleSubmit, rowId }) => {
  const { t } = useTranslation();

  const [buttonAuthVisible, { setTrue: openButtonAuthModal, setFalse: closeButtonAuthModal }] = useBoolean();

  const [menuAuthVisible, { setTrue: openMenuAuthModal, setFalse: closeMenuAuthModal }] = useBoolean();

  return (
    <ADrawer
      onClose={onClose}
      title={operateType === 'add' ? t('page.manage.role.addRole') : t('page.manage.role.editRole')}
      open={open}
      footer={
        <AFlex justify="space-between">
          <AButton onClick={onClose}>{t('common.cancel')}</AButton>
          <AButton
            onClick={handleSubmit}
            type="primary"
          >
            {t('common.confirm')}
          </AButton>
        </AFlex>
      }
    >
      <AForm
        form={form}
        layout="vertical"
      >
        <AForm.Item
          label={t('page.manage.role.roleName')}
          name="roleName"
        >
          <AInput placeholder={t('page.manage.role.form.roleName')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.manage.role.roleCode')}
          name="roleCode"
        >
          <AInput placeholder={t('page.manage.role.form.roleCode')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.manage.role.roleStatus')}
          name="status"
        >
          <ARadio.Group>
            {enableStatusOptions.map(item => (
              <ARadio
                value={item.value}
                key={item.value}
              >
                {t(item.label)}
              </ARadio>
            ))}
          </ARadio.Group>
        </AForm.Item>

        <AForm.Item
          label={t('page.manage.role.roleDesc')}
          name="roleDesc"
        >
          <AInput placeholder={t('page.manage.role.form.roleDesc')} />
        </AForm.Item>
      </AForm>

      {operateType === 'edit' && (
        <ASpace>
          <AButton onClick={openButtonAuthModal}>{t('page.manage.role.buttonAuth')}</AButton>
          <ButtonAuthModal
            onClose={closeButtonAuthModal}
            open={buttonAuthVisible}
            roleId={rowId}
          />

          <AButton onClick={openMenuAuthModal}>{t('page.manage.role.menuAuth')}</AButton>
          <MenuAuthModal
            roleId={rowId}
            onClose={closeMenuAuthModal}
            open={menuAuthVisible}
          />
        </ASpace>
      )}
    </ADrawer>
  );
});

export default RoleOperateDrawer;
