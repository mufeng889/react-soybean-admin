import { SimpleScrollbar } from '@sa/materials';
import { enableStatusOptions, menuIconTypeOptions, menuTypeOptions } from '@/constants/business';
import { getLocalIcons } from '@/utils/icon';
import { createDefaultModel, getPageOptions, layoutOptions } from './shared';
import type { Model, OperateType, Props, RuleKey } from './shared';
import { QueryForm } from './query-form';

const localIcons = getLocalIcons();

const localIconOptions = localIcons.map(item => ({
  label: (
    <div className="flex-y-center gap-16px">
      <SvgIcon
        localIcon={item}
        className="text-icon"
      />
      <span>{item}</span>
    </div>
  ),
  value: item
}));

const MenuOperateModal = ({ operateType, open, onClose, form, allPages, handleSubmit, menuList }: Props) => {
  const { t } = useTranslation();

  const titles: Record<OperateType, string> = {
    add: t('page.manage.menu.addMenu'),
    addChild: t('page.manage.menu.addChildMenu'),
    edit: t('page.manage.menu.editMenu')
  };

  const { defaultRequiredRule } = useFormRules();

  const { routeName, iconType, menuType, parentId, icon, hideInMenu } =
    (AForm.useWatch<Model>(item => Object.assign(createDefaultModel(), item), { form, preserve: true }) as Model) ||
    form.getFieldsValue();

  const showPage = menuType === '2';

  const showLayout = Number(parentId) === 0;

  const pageOptions = getPageOptions(routeName, allPages);

  const rules: Record<RuleKey, App.Global.FormRule> = {
    menuName: defaultRequiredRule,
    status: defaultRequiredRule,
    routeName: defaultRequiredRule,
    routePath: defaultRequiredRule
  };

  return (
    <AModal
      onCancel={onClose}
      open={open}
      onOk={handleSubmit}
      width="800px"
      title={titles[operateType]}
    >
      <div className="h-480px">
        <SimpleScrollbar>
          <AForm
            className="pr-20px"
            form={form}
            initialValues={createDefaultModel()}
            labelWrap
            labelCol={{ lg: 8, xs: 4 }}
          >
            <ARow>
              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="menuType"
                  label={t('page.manage.menu.menuType')}
                >
                  <ARadio.Group disabled={operateType === 'edit'}>
                    {menuTypeOptions.map(item => (
                      <ARadio
                        key={item.value}
                        value={item.value}
                      >
                        {t(item.label)}
                      </ARadio>
                    ))}
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.menuName')}
                  name="menuName"
                  rules={[rules.menuName]}
                >
                  <AInput placeholder={t('page.manage.menu.form.menuName')} />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.routeName')}
                  name="routeName"
                  rules={[rules.routeName]}
                >
                  <AInput placeholder={t('page.manage.menu.form.routeName')} />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.routePath')}
                  name="routePath"
                  rules={[rules.routePath]}
                >
                  <AInput placeholder={t('page.manage.menu.form.routePath')} />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.pathParam')}
                  name="pathParam"
                >
                  <AInput placeholder={t('page.manage.menu.form.pathParam')} />
                </AForm.Item>
              </ACol>

              {showLayout && (
                <ACol
                  lg={12}
                  xs={24}
                >
                  <AForm.Item
                    label={t('page.manage.menu.layout')}
                    name="layout"
                  >
                    <ASelect
                      options={layoutOptions}
                      placeholder={t('page.manage.menu.form.layout')}
                    />
                  </AForm.Item>
                </ACol>
              )}

              {!showLayout && (
                <ACol
                  lg={12}
                  xs={24}
                >
                  <AForm.Item
                    label={t('page.manage.menu.parent')}
                    name="parentId"
                  >
                    <ASelect
                      options={menuList}
                      placeholder={t('page.manage.menu.form.parent')}
                    />
                  </AForm.Item>
                </ACol>
              )}

              {showPage && (
                <ACol
                  lg={12}
                  xs={24}
                >
                  <AForm.Item
                    label={t('page.manage.menu.page')}
                    name="page"
                  >
                    <ASelect
                      options={pageOptions}
                      placeholder={t('page.manage.menu.form.page')}
                    />
                  </AForm.Item>
                </ACol>
              )}

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.i18nKey')}
                  name="i18nKey"
                >
                  <AInput placeholder={t('page.manage.menu.form.i18nKey')} />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.order')}
                  name="order"
                >
                  <AInputNumber
                    className="w-full"
                    placeholder={t('page.manage.menu.form.order')}
                  />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="iconType"
                  label={t('page.manage.menu.iconTypeTitle')}
                >
                  <ARadio.Group>
                    {menuIconTypeOptions.map(item => (
                      <ARadio
                        key={item.value}
                        value={item.value}
                      >
                        {t(item.label)}
                      </ARadio>
                    ))}
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.icon')}
                  name="icon"
                >
                  {Number(iconType) === 1 ? (
                    <AInput
                      className="flex-1"
                      placeholder={t('page.manage.menu.form.icon')}
                      suffix={
                        <SvgIcon
                          className="text-icon"
                          icon={icon}
                        />
                      }
                    />
                  ) : (
                    <ASelect
                      allowClear
                      placeholder={t('page.manage.menu.form.localIcon')}
                      options={localIconOptions}
                    />
                  )}
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="status"
                  label={t('page.manage.menu.menuStatus')}
                  rules={[rules.status]}
                >
                  <ARadio.Group>
                    {enableStatusOptions.map(item => (
                      <ARadio
                        key={item.value}
                        value={item.value}
                      >
                        {t(item.label)}
                      </ARadio>
                    ))}
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="keepAlive"
                  label={t('page.manage.menu.keepAlive')}
                >
                  <ARadio.Group>
                    <ARadio value={true}>{t('common.yesOrNo.yes')}</ARadio>
                    <ARadio value={false}>{t('common.yesOrNo.no')}</ARadio>
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="constant"
                  label={t('page.manage.menu.constant')}
                >
                  <ARadio.Group>
                    <ARadio value={true}>{t('common.yesOrNo.yes')}</ARadio>
                    <ARadio value={false}>{t('common.yesOrNo.no')}</ARadio>
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.href')}
                  name="href"
                >
                  <AInput placeholder={t('page.manage.menu.form.href')} />
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="hideInMenu"
                  label={t('page.manage.menu.hideInMenu')}
                >
                  <ARadio.Group>
                    <ARadio value={true}>{t('common.yesOrNo.yes')}</ARadio>
                    <ARadio value={false}>{t('common.yesOrNo.no')}</ARadio>
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              {hideInMenu && (
                <ACol
                  lg={12}
                  xs={24}
                >
                  <AForm.Item
                    label={t('page.manage.menu.activeMenu')}
                    name="activeMenu"
                  >
                    <ASelect
                      allowClear
                      options={pageOptions}
                      placeholder={t('page.manage.menu.form.activeMenu')}
                    />
                  </AForm.Item>
                </ACol>
              )}

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  name="multiTab"
                  label={t('page.manage.menu.multiTab')}
                >
                  <ARadio.Group>
                    <ARadio value={true}>{t('common.yesOrNo.yes')}</ARadio>
                    <ARadio value={false}>{t('common.yesOrNo.no')}</ARadio>
                  </ARadio.Group>
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.fixedIndexInTab')}
                  name="fixedIndexInTab"
                >
                  <AInputNumber
                    className="w-full"
                    placeholder={t('page.manage.menu.form.fixedIndexInTab')}
                  />
                </AForm.Item>
              </ACol>

              <ACol span={24}>
                <AForm.Item
                  label={t('page.manage.menu.query')}
                  labelCol={{ span: 4 }}
                >
                  <AForm.List name="query">
                    {(subFields, { add, remove }) => {
                      return (
                        <>
                          {subFields.map(item => (
                            <QueryForm
                              key={item.key}
                              item={item}
                              add={add}
                              index={subFields.findIndex(field => field.key === item.key)}
                              remove={remove}
                            />
                          ))}

                          {subFields.length === 0 && (
                            <AButton
                              type="dashed"
                              block
                              onClick={() => add('', 0)}
                              icon={<IconCarbonAdd className="align-sub text-icon" />}
                            >
                              <span className="ml-8px">{t('common.add')}</span>
                            </AButton>
                          )}
                        </>
                      );
                    }}
                  </AForm.List>
                </AForm.Item>
              </ACol>
            </ARow>
          </AForm>
        </SimpleScrollbar>
      </div>
    </AModal>
  );
};

export default MenuOperateModal;
