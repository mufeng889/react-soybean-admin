import { Suspense } from 'react';
import { fetchGetRoleList } from '@/service/api';
import { enableStatusRecord } from '@/constants/business';
import { ATG_MAP } from '@/constants/common';
import RoleSearch from './modules/role-search';

const RoleOperateDrawer = lazy(() => import('./modules/role-operate-drawer'));

export function Component() {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const { tableWrapperRef, scrollConfig } = useTableScroll();

  const { columnChecks, data, setColumnChecks, tableProps, run, searchProps } = useTable({
    apiFn: fetchGetRoleList,
    apiParams: {
      current: 1,
      size: 10,
      status: undefined,
      roleName: undefined,
      roleCode: undefined
    },
    columns: () => [
      {
        key: 'index',
        dataIndex: 'index',
        title: t('common.index'),
        width: 64,
        align: 'center'
      },
      {
        key: 'roleName',
        dataIndex: 'roleName',
        title: t('page.manage.role.roleName'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'roleCode',
        dataIndex: 'roleCode',
        title: t('page.manage.role.roleCode'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'roleDesc',
        dataIndex: 'roleDesc',
        title: t('page.manage.role.roleDesc'),
        minWidth: 120
      },
      {
        key: 'status',
        dataIndex: 'status',
        title: t('page.manage.user.userStatus'),
        align: 'center',
        width: 100,
        render: (_, record) => {
          if (record.status === null) {
            return null;
          }
          const label = t(enableStatusRecord[record.status]);
          return <ATag color={ATG_MAP[record.status]}>{label}</ATag>;
        }
      },
      {
        key: 'operate',
        title: t('common.operate'),
        align: 'center',
        width: 195,
        render: (_, record) => (
          <div className="flex-center gap-8px">
            <AButton
              type="primary"
              ghost
              size="small"
              onClick={() => edit(record.id)}
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
        )
      }
    ]
  });

  const {
    checkedRowKeys,
    rowSelection,
    onBatchDeleted,
    onDeleted,
    handleEdit,
    handleAdd,
    generalPopupOperation,
    editingData
  } = useTableOperate(data, run, async (res, type) => {
    if (type === 'add') {
      // add request 调用新增的接口
      console.log(res);
    } else {
      // edit request 调用编辑的接口
      console.log(res);
    }
  });

  async function handleBatchDelete() {
    // request
    console.log(checkedRowKeys);
    onBatchDeleted();
  }

  function handleDelete(id: number) {
    // request
    console.log(id);

    onDeleted();
  }

  function edit(id: number) {
    handleEdit(id);
  }

  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        defaultActiveKey={isMobile ? undefined : '1'}
        className="card-wrapper"
        items={[
          {
            key: '1',
            label: t('common.search'),
            children: <RoleSearch {...searchProps} />
          }
        ]}
      />

      <ACard
        ref={tableWrapperRef}
        bordered={false}
        extra={
          <TableHeaderOperation
            onDelete={handleBatchDelete}
            refresh={run}
            add={handleAdd}
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
          <RoleOperateDrawer
            {...generalPopupOperation}
            rowId={editingData?.id || -1}
          />
        </Suspense>
      </ACard>
    </div>
  );
}
