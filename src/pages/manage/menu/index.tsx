import { useRequest } from '@sa/hooks';
import { Suspense } from 'react';

import { enableStatusRecord, menuTypeRecord } from '@/constants/business';
import { ATG_MAP, YesOrNo_Map, yesOrNoRecord } from '@/constants/common';
import { fetchGetAllPages, fetchGetMenuList } from '@/service/api';

import MenuOperateModal from './modules/menu-operate-modal';
import type { OperateType } from './modules/shared';
import { createDefaultModel, flattenMenu, getLayoutAndPage, getPathParamFromRoutePath } from './modules/shared';

export function Component() {
  const { t } = useTranslation();

  const { scrollConfig, tableWrapperRef } = useTableScroll();

  const { data: allPages } = useRequest(fetchGetAllPages);

  const { columnChecks, data, run, setColumnChecks, tableProps } = useTable(
    {
      apiFn: fetchGetMenuList,
      columns: () => [
        {
          align: 'center',
          dataIndex: 'id',
          key: 'id',
          title: t('page.manage.menu.id')
        },
        {
          align: 'center',
          key: 'menuType',
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
          },
          title: t('page.manage.menu.menuType'),
          width: 80
        },
        {
          align: 'center',
          key: 'menuName',
          minWidth: 120,
          render: (_, record) => {
            const { i18nKey, menuName } = record;

            const label = i18nKey ? t(i18nKey) : menuName;

            return <span>{label}</span>;
          },
          title: t('page.manage.menu.menuName')
        },
        {
          align: 'center',
          key: 'icon',
          render: (_, record) => {
            const icon = record.iconType === '1' ? record.icon : undefined;

            const localIcon = record.iconType === '2' ? record.icon : undefined;

            return (
              <div className="flex-center">
                <SvgIcon
                  className="text-icon"
                  icon={icon}
                  localIcon={localIcon}
                />
              </div>
            );
          },
          title: t('page.manage.menu.icon'),
          width: 60
        },
        {
          align: 'center',
          dataIndex: 'routeName',
          key: 'routeName',
          minWidth: 120,
          title: t('page.manage.menu.routeName')
        },
        {
          align: 'center',
          dataIndex: 'routePath',
          key: 'routePath',
          minWidth: 120,
          title: t('page.manage.menu.routePath')
        },
        {
          align: 'center',
          dataIndex: 'status',
          key: 'status',
          render: (_, record) => {
            if (record.status === null) {
              return null;
            }

            const label = t(enableStatusRecord[record.status]);

            return <ATag color={ATG_MAP[record.status]}>{label}</ATag>;
          },
          title: t('page.manage.menu.menuStatus'),
          width: 80
        },
        {
          align: 'center',
          dataIndex: 'hideInMenu',
          key: 'hideInMenu',
          render: (_, record) => {
            const hide: CommonType.YesOrNo = record.hideInMenu ? 'Y' : 'N';

            const label = t(yesOrNoRecord[hide]);

            return <ATag color={YesOrNo_Map[hide]}>{label}</ATag>;
          },
          title: t('page.manage.menu.hideInMenu'),
          width: 80
        },
        {
          align: 'center',
          dataIndex: 'parentId',
          key: 'parentId',
          title: t('page.manage.menu.parentId'),
          width: 90
        },
        {
          align: 'center',
          dataIndex: 'order',
          key: 'order',
          title: t('page.manage.menu.order'),
          width: 60
        },
        {
          align: 'center',
          key: 'operate',
          render: (_, record, index) => (
            <div className="flex-center justify-end gap-8px">
              {record.menuType === '1' && (
                <AButton
                  ghost
                  size="small"
                  type="primary"
                  onClick={() => handleAddChildMenu(record.id)}
                >
                  {t('page.manage.menu.addChildMenu')}
                </AButton>
              )}
              <AButton
                size="small"
                onClick={() => edit(record, index)}
              >
                {t('common.edit')}
              </AButton>

              <APopconfirm
                title={t('common.confirmDelete')}
                onConfirm={() => handleDelete(record.id)}
              >
                <AButton
                  danger
                  size="small"
                >
                  {t('common.delete')}
                </AButton>
              </APopconfirm>
            </div>
          ),
          title: t('common.operate'),
          width: 195
        }
      ]
    },
    { hideOnSinglePage: true }
  );

  const menuList = useMemo(() => flattenMenu(data, t), [data, t]);

  const {
    checkedRowKeys,
    generalPopupOperation,
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    openDrawer,
    rowSelection
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
    const { param, path } = getPathParamFromRoutePath(rest.routePath);

    const itemData = Object.assign(createDefaultModel(), rest, {
      index,
      layout,
      page,
      pathParam: param,
      routePath: path
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
        bordered={false}
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
        ref={tableWrapperRef}
        title={t('page.manage.role.title')}
        extra={
          <TableHeaderOperation
            add={onAdd}
            columns={columnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            loading={tableProps.loading}
            refresh={run}
            setColumnChecks={setColumnChecks}
            onDelete={handleBatchDelete}
          />
        }
      >
        <ATable
          rowSelection={rowSelection}
          scroll={scrollConfig}
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
