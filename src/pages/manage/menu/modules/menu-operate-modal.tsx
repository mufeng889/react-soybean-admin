import { SimpleScrollbar } from '@sa/materials';

import { enableStatusOptions, menuIconTypeOptions, menuTypeOptions } from '@/constants/business';
import { getLocalIcons } from '@/utils/icon';

import { QueryForm } from './query-form';
import { createDefaultModel, getPageOptions, layoutOptions } from './shared';
import type { Model, OperateType, Props, RuleKey } from './shared';

const localIcons = getLocalIcons();

const localIconOptions = localIcons.map(item => ({
  label: (
    <div className="flex-y-center gap-16px">
      <SvgIcon
        className="text-icon"
        localIcon={item}
      />
      <span>{item}</span>
    </div>
  ),
  value: item
}));

const MenuOperateModal = ({ allPages, form, handleSubmit, menuList, onClose, open, operateType }: Props) => {
  const { t } = useTranslation();

  const titles: Record<OperateType, string> = {
    add: t('page.manage.menu.addMenu'),
    addChild: t('page.manage.menu.addChildMenu'),
    edit: t('page.manage.menu.editMenu')
  };

  const { defaultRequiredRule } = useFormRules();

  const { hideInMenu, icon, iconType, menuType, parentId, routeName } =
    (AForm.useWatch<Model>(item => Object.assign(createDefaultModel(), item), { form, preserve: true }) as Model) ||
    form.getFieldsValue();

  const showPage = menuType === '2';

  const showLayout = Number(parentId) === 0;

  const pageOptions = getPageOptions(routeName, allPages);

  const rules: Record<RuleKey, App.Global.FormRule> = {
    menuName: defaultRequiredRule,
    routeName: defaultRequiredRule,
    routePath: defaultRequiredRule,
    status: defaultRequiredRule
  };

  return (
    <AModal
      open={open}
      title={titles[operateType]}
      width="800px"
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <div className="h-480px">
        <SimpleScrollbar>
          <AForm
            labelWrap
            className="pr-20px"
            form={form}
            initialValues={createDefaultModel()}
            labelCol={{ lg: 8, xs: 4 }}
          >
            <ARow>
              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.menuType')}
                  name="menuType"
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
                  label={t('page.manage.menu.iconTypeTitle')}
                  name="iconType"
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
                      options={localIconOptions}
                      placeholder={t('page.manage.menu.form.localIcon')}
                    />
                  )}
                </AForm.Item>
              </ACol>

              <ACol
                lg={12}
                xs={24}
              >
                <AForm.Item
                  label={t('page.manage.menu.menuStatus')}
                  name="status"
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
                  label={t('page.manage.menu.keepAlive')}
                  name="keepAlive"
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
                  label={t('page.manage.menu.constant')}
                  name="constant"
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
                  label={t('page.manage.menu.hideInMenu')}
                  name="hideInMenu"
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
                  label={t('page.manage.menu.multiTab')}
                  name="multiTab"
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
                              add={add}
                              index={subFields.findIndex(field => field.key === item.key)}
                              item={item}
                              key={item.key}
                              remove={remove}
                            />
                          ))}

                          {subFields.length === 0 && (
                            <AButton
                              block
                              icon={<IconCarbonAdd className="align-sub text-icon" />}
                              type="dashed"
                              onClick={() => add('', 0)}
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
