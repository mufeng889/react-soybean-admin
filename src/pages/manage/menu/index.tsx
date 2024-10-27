import { useRequest } from '@sa/hooks';
import { Suspense } from 'react';
import { fetchGetAllPages, fetchGetMenuList } from '@/service/api';
import { enableStatusRecord, menuTypeRecord } from '@/constants/business';
import { ATG_MAP, YesOrNo_Map, yesOrNoRecord } from '@/constants/common';
import MenuOperateModal from './modules/menu-operate-modal';
import type { OperateType } from './modules/shared';
import { createDefaultModel, flattenMenu, getLayoutAndPage, getPathParamFromRoutePath } from './modules/shared';

export function Component() {
  const { t } = useTranslation();

  const { tableWrapperRef, scrollConfig } = useTableScroll();

  const { data: allPages } = useRequest(fetchGetAllPages);

  const { columnChecks, data, setColumnChecks, tableProps, run } = useTable(
    {
      apiFn: fetchGetMenuList,
      columns: () => [
        {
          key: 'id',
          title: t('page.manage.menu.id'),
          align: 'center',
          dataIndex: 'id'
        },
        {
          key: 'menuType',
          title: t('page.manage.menu.menuType'),
          align: 'center',
          width: 80,
          render: (_, record) => {
            if (record.status === null) {
              return null;
            }

            const tagMap: Record<Api.SystemManage.MenuType, string> = {
              1: 'default',
              2: 'processing'
            };

            const label = t(menuTypeRecord[record.menuType]);
            return <ATag color={tagMap[record.menuType]}>{label}</ATag>;
          }
        },
        {
          key: 'menuName',
          title: t('page.manage.menu.menuName'),
          align: 'center',
          minWidth: 120,
          render: (_, record) => {
            const { i18nKey, menuName } = record;

            const label = i18nKey ? t(i18nKey) : menuName;

            return <span>{label}</span>;
          }
        },
        {
          key: 'icon',
          title: t('page.manage.menu.icon'),
          align: 'center',
          width: 60,
          render: (_, record) => {
            const icon = record.iconType === '1' ? record.icon : undefined;

            const localIcon = record.iconType === '2' ? record.icon : undefined;

            return (
              <div className="flex-center">
                <SvgIcon
                  icon={icon}
                  localIcon={localIcon}
                  className="text-icon"
                />
              </div>
            );
          }
        },
        {
          key: 'routeName',
          title: t('page.manage.menu.routeName'),
          align: 'center',
          dataIndex: 'routeName',
          minWidth: 120
        },
        {
          key: 'routePath',
          title: t('page.manage.menu.routePath'),
          align: 'center',
          dataIndex: 'routePath',
          minWidth: 120
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: t('page.manage.menu.menuStatus'),
          align: 'center',
          width: 80,
          render: (_, record) => {
            if (record.status === null) {
              return null;
            }

            const label = t(enableStatusRecord[record.status]);

            return <ATag color={ATG_MAP[record.status]}>{label}</ATag>;
          }
        },
        {
          key: 'hideInMenu',
          title: t('page.manage.menu.hideInMenu'),
          dataIndex: 'hideInMenu',
          align: 'center',
          width: 80,
          render: (_, record) => {
            const hide: CommonType.YesOrNo = record.hideInMenu ? 'Y' : 'N';

            const label = t(yesOrNoRecord[hide]);

            return <ATag color={YesOrNo_Map[hide]}>{label}</ATag>;
          }
        },
        {
          key: 'parentId',
          dataIndex: 'parentId',
          title: t('page.manage.menu.parentId'),
          width: 90,
          align: 'center'
        },
        {
          key: 'order',
          dataIndex: 'order',
          title: t('page.manage.menu.order'),
          align: 'center',
          width: 60
        },
        {
          key: 'operate',
          title: t('common.operate'),
          align: 'center',
          width: 195,
          render: (_, record, index) => (
            <div className="flex-center justify-end gap-8px">
              {record.menuType === '1' && (
                <AButton
                  type="primary"
                  ghost
                  onClick={() => handleAddChildMenu(record.id)}
                  size="small"
                >
                  {t('page.manage.menu.addChildMenu')}
                </AButton>
              )}
              <AButton
                onClick={() => edit(record, index)}
                size="small"
              >
                {t('common.edit')}
              </AButton>

              <APopconfirm
                onConfirm={() => handleDelete(record.id)}
                title={t('common.confirmDelete')}
              >
                <AButton
                  danger
                  size="small"
                >
                  {t('common.delete')}
                </AButton>
              </APopconfirm>
            </div>
          )
        }
      ]
    },
    { hideOnSinglePage: true }
  );

  const menuList = useMemo(() => flattenMenu(data, t), [data, t]);

  const {
    checkedRowKeys,
    rowSelection,
    onBatchDeleted,
    onDeleted,
    handleAdd,
    generalPopupOperation,
    handleEdit,
    openDrawer
  } = useTableOperate(data, run, async (res, type) => {
    if (type === 'add') {
      // add request 调用新增的接口
      console.log(res);
    } else {
      // edit request 调用编辑的接口
      console.log(res);
    }
  });

  const [operateType, setOperateType] = useState<OperateType>('add');

  async function handleBatchDelete() {
    // request

    onBatchDeleted();
  }

  function onAdd() {
    setOperateType('add');

    handleAdd();
  }

  function handleDelete(id: number) {
    // request
    console.log(id);

    onDeleted();
  }

  function edit(item: Api.SystemManage.Menu, index: number) {
    const { component, ...rest } = item;

    const { layout, page } = getLayoutAndPage(component);
    const { path, param } = getPathParamFromRoutePath(rest.routePath);

    const itemData = Object.assign(createDefaultModel(), rest, {
      layout,
      page,
      routePath: path,
      pathParam: param,
      index
    });

    handleEdit(itemData);
    setOperateType('edit');
  }

  function handleAddChildMenu(id: number) {
    generalPopupOperation.form.setFieldsValue(Object.assign(createDefaultModel(), { parentId: id }));

    setOperateType('addChild');

    openDrawer();
  }

  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACard
        ref={tableWrapperRef}
        bordered={false}
        extra={
          <TableHeaderOperation
            onDelete={handleBatchDelete}
            refresh={run}
            add={onAdd}
            loading={tableProps.loading}
            setColumnChecks={setColumnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            columns={columnChecks}
          />
        }
        title={t('page.manage.role.title')}
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
      >
        <ATable
          scroll={scrollConfig}
          rowSelection={rowSelection}
          size="small"
          {...tableProps}
        />

        <Suspense>
          <MenuOperateModal
            {...Object.assign(generalPopupOperation, { operateType })}
            allPages={allPages || []}
            menuList={menuList || []}
          />
        </Suspense>
      </ACard>
    </div>
  );
}
