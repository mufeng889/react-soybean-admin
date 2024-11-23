import { Suspense, lazy } from 'react';

import TableHeaderOperation from '@/components/advanced/TableHeaderOperation';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { ATG_MAP } from '@/constants/common';
import { fetchGetUserList } from '@/service/api';

import UserSearch from './modules/UserSearch';

const UserOperateDrawer = lazy(() => import('./modules/UserOperateDrawer'));

const tagUserGenderMap: Record<Api.SystemManage.UserGender, string> = {
  1: 'processing',
  2: 'error'
};

export function Component() {
  const { t } = useTranslation();

  const { scrollConfig, tableWrapperRef } = useTableScroll();

  const nav = useNavigate();

  const isMobile = useMobile();

  const { columnChecks, data, run, searchProps, setColumnChecks, tableProps } = useTable(
    {
      apiFn: fetchGetUserList,
      apiParams: {
        current: 1,
        nickName: null,
        size: 10,
        // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
        // the value can not be undefined, otherwise the property in Form will not be reactive
        status: null,
        userEmail: null,
        userGender: null,
        userName: null,
        userPhone: null
      },
      columns: () => [
        {
          align: 'center',
          dataIndex: 'index',
          key: 'index',
          title: t('common.index'),
          width: 64
        },
        {
          align: 'center',
          dataIndex: 'userName',
          key: 'userName',
          minWidth: 100,
          title: t('page.manage.user.userName')
        },
        {
          align: 'center',
          dataIndex: 'userGender',
          key: 'userGender',
          render: (_, record) => {
            if (record?.userGender === null) {
              return null;
            }

            const label = t(userGenderRecord[record.userGender]);

            return <ATag color={tagUserGenderMap[record.userGender]}>{label}</ATag>;
          },
          title: t('page.manage.user.userGender'),
          width: 100
        },
        {
          align: 'center',
          dataIndex: 'nickName',
          key: 'nickName',
          minWidth: 100,
          title: t('page.manage.user.nickName')
        },
        {
          align: 'center',
          dataIndex: 'userPhone',
          key: 'userPhone',
          title: t('page.manage.user.userPhone'),
          width: 120
        },
        {
          align: 'center',
          dataIndex: 'userEmail',
          key: 'userEmail',
          minWidth: 200,
          title: t('page.manage.user.userEmail')
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
          title: t('page.manage.user.userStatus'),
          width: 100
        },
        {
          align: 'center',
          key: 'operate',
          render: (_, record) => (
            <div className="flex-center gap-8px">
              <AButton
                ghost
                size="small"
                type="primary"
                onClick={() => edit(record.id)}
              >
                {t('common.edit')}
              </AButton>
              <AButton
                size="small"
                onClick={() => nav(`/manage/user-detail/${record.id}`)}
              >
                详情
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
    { showQuickJumper: true }
  );

  const { checkedRowKeys, generalPopupOperation, handleAdd, handleEdit, onBatchDeleted, onDeleted, rowSelection } =
    useTableOperate(data, run, async (res, type) => {
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
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: <UserSearch {...searchProps} />,
            key: '1',
            label: t('common.search')
          }
        ]}
      />

      <ACard
        bordered={false}
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
        ref={tableWrapperRef}
        title={t('page.manage.user.title')}
        extra={
          <TableHeaderOperation
            add={handleAdd}
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
          <UserOperateDrawer {...generalPopupOperation} />
        </Suspense>
      </ACard>
    </div>
  );
}
