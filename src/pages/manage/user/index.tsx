import { Button, Card, Popconfirm, Table, Tag } from 'antd';
import { fetchGetUserList } from '@/service/api';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import TableHeaderOperation from '@/components/advanced/TableHeaderOperation';
import UserSearch from './modules/UserSearch';
import UserOperateDrawer from './modules/UserOperateDrawer';

const tagMap: Record<Api.Common.EnableStatus, string> = {
  1: 'success',
  2: 'warning'
};

const tagUserGenderMap: Record<Api.SystemManage.UserGender, string> = {
  1: 'processing',
  2: 'error'
};

export function Component() {
  const { t } = useTranslation();

  const { tableWrapperRef, scrollConfig } = useTableScroll();

  const { columns, columnChecks, data, run, loading, pagination, reset, form, setColumnChecks } = useTable(
    {
      apiFn: fetchGetUserList,
      apiParams: {
        current: 1,
        size: 10,
        // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
        // the value can not be undefined, otherwise the property in Form will not be reactive
        status: null,
        userName: null,
        userGender: null,
        nickName: null,
        userPhone: null,
        userEmail: null
      },
      columns: () => [
        {
          key: 'index',
          title: t('common.index'),
          dataIndex: 'index',
          align: 'center',
          width: 64
        },
        {
          key: 'userName',
          dataIndex: 'userName',
          title: t('page.manage.user.userName'),
          align: 'center',
          minWidth: 100
        },
        {
          key: 'userGender',
          title: t('page.manage.user.userGender'),
          align: 'center',
          dataIndex: 'userGender',
          width: 100,
          render: (_, record) => {
            if (record?.userGender === null) {
              return null;
            }

            const label = t(userGenderRecord[record.userGender]);

            return <Tag color={tagUserGenderMap[record.userGender]}>{label}</Tag>;
          }
        },
        {
          key: 'nickName',
          dataIndex: 'nickName',
          title: t('page.manage.user.nickName'),
          align: 'center',
          minWidth: 100
        },
        {
          key: 'userPhone',
          dataIndex: 'userPhone',
          title: t('page.manage.user.userPhone'),
          align: 'center',
          width: 120
        },
        {
          key: 'userEmail',
          dataIndex: 'userEmail',
          title: t('page.manage.user.userEmail'),
          align: 'center',
          minWidth: 200
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

            return <Tag color={tagMap[record.status]}>{label}</Tag>;
          }
        },
        {
          key: 'operate',
          title: t('common.operate'),
          align: 'center',
          width: 130,
          render: (_, record) => (
            <div className="flex-center gap-8px">
              <Button
                type="primary"
                ghost
                size="small"
                onClick={() => edit(record.id)}
              >
                {t('common.edit')}
              </Button>
              <Popconfirm
                title={t('common.confirmDelete')}
                onConfirm={() => handleDelete(record.id)}
              >
                <Button
                  danger
                  size="small"
                >
                  {t('common.delete')}
                </Button>
              </Popconfirm>
            </div>
          )
        }
      ]
    },
    { showQuickJumper: true }
  );

  const {
    checkedRowKeys,
    rowSelection,
    onBatchDeleted,
    onDeleted,
    handleEdit,
    handleAdd,
    drawerVisible,
    closeDrawer,
    operateType,
    editingData
  } = useTableOperate(data, run);

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
      <UserSearch
        search={run}
        reset={reset}
        form={form}
      />
      <Card
        styles={{ body: { flex: 1, overflow: 'hidden' } }}
        ref={tableWrapperRef}
        bordered={false}
        extra={
          <TableHeaderOperation
            onDelete={handleBatchDelete}
            refresh={run}
            add={handleAdd}
            loading={loading}
            setColumnChecks={setColumnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            columns={columnChecks}
          />
        }
        title={t('page.manage.user.title')}
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
      >
        <Table
          pagination={pagination}
          rowKey="id"
          scroll={scrollConfig}
          rowSelection={rowSelection}
          size="small"
          loading={loading}
          dataSource={data}
          columns={columns}
        />
        <UserOperateDrawer
          open={drawerVisible}
          rowData={editingData}
          submitted={run}
          operateType={operateType}
          closeDrawer={closeDrawer}
        />
      </Card>
    </div>
  );
}
