import type { TablePaginationConfig, TableProps } from 'antd';
import { useBoolean, useHookTable } from '@sa/hooks';
import { Form } from 'antd';
import { getIsMobile } from '@/store/slice/app';

type TableData = AntDesign.TableData;
type GetTableData<A extends AntDesign.TableApiFn> = AntDesign.GetTableData<A>;
type TableColumn<T> = AntDesign.TableColumn<T>;

export function useTable<A extends AntDesign.TableApiFn>(
  config: AntDesign.AntDesignTableConfig<A>,
  paginationConfig?: Omit<TablePaginationConfig, 'total' | 'current' | 'pageSize' | 'onChange'>
) {
  const isMobile = useAppSelector(getIsMobile);

  const [total, setTotal] = useState<TablePaginationConfig['total']>(0);

  const { apiFn, apiParams, immediate, rowKey = 'id' } = config;

  const [form] = Form.useForm<AntDesign.AntDesignTableConfig<A>['apiParams']>();

  const {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    setColumnChecks,
    searchParams,
    updateSearchParams,
    resetSearchParams
  } = useHookTable<A, GetTableData<A>, TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>>({
    apiFn,
    apiParams,
    columns: config.columns,
    transformer: res => {
      const { records = [], current = 1, size = 10, total: totalNum = 0 } = res.data || {};

      const recordsWithIndex = records.map((item, index) => {
        return {
          ...item,
          index: (current - 1) * size + index + 1
        };
      });

      return {
        data: recordsWithIndex,
        pageNum: current,
        pageSize: size,
        total: totalNum
      };
    },
    getColumnChecks: cols => {
      const checks: AntDesign.TableColumnCheck[] = [];

      cols.forEach(column => {
        if (column.key) {
          checks.push({
            key: column.key as string,
            title: column.title as string,
            checked: true
          });
        }
      });

      return checks;
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<string, TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>>();

      cols.forEach(column => {
        if (column.key) {
          columnMap.set(column.key as string, column);
        }
      });

      const filteredColumns = checks.filter(item => item.checked).map(check => columnMap.get(check.key));

      return filteredColumns as TableColumn<AntDesign.TableDataWithIndex<GetTableData<A>>>[];
    },
    onFetched: async transformed => {
      const { total: totalNum } = transformed;

      setTotal(totalNum);
    },
    immediate
  });

  // this is for mobile, if the system does not support mobile, you can use `pagination` directly
  const pagination: TablePaginationConfig = {
    total,
    simple: isMobile,
    pageSizeOptions: ['10', '15', '20', '25', '30'],
    showSizeChanger: true,
    current: searchParams.current.current,
    pageSize: searchParams.current.size,
    onChange: async (current: number, size: number) => {
      updateSearchParams({
        current,
        size
      });
    },
    ...paginationConfig
  };

  function reset() {
    form.resetFields();
    resetSearchParams();
  }

  async function run(isResetCurrent: boolean = true) {
    const res = await form.validateFields();

    if (res) {
      if (isResetCurrent) {
        const { current = 1, ...rest } = res;
        updateSearchParams({ current, ...rest });
      } else {
        updateSearchParams(res);
      }
    }
  }

  return {
    tableProps: {
      loading,
      dataSource: data,
      columns,
      rowKey,
      pagination
    },
    empty,
    data,
    columnChecks,
    run,
    setColumnChecks,
    searchParams,
    form,
    reset
  };
}

export function useTableOperate<T extends TableData = TableData>(
  data: T[],
  getData: (isResetCurrent: boolean) => Promise<void>
) {
  const { bool: drawerVisible, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean();
  const { t } = useTranslation();
  const [operateType, setOperateType] = useState<AntDesign.TableOperateType>('add');

  function handleAdd() {
    setOperateType('add');
    openDrawer();
  }

  /** the editing row data */
  const [editingData, setEditingData] = useState<T>();

  function handleEdit(id: T['id']) {
    setOperateType('edit');
    const findItem = data.find(item => item.id === id);
    setEditingData(findItem);
    openDrawer();
  }

  /** the checked row keys of table */
  const [checkedRowKeys, setCheckedRowKeys] = useState<React.Key[]>([]);

  function onSelectChange(keys: React.Key[]) {
    setCheckedRowKeys(keys);
  }

  const rowSelection: TableProps<T>['rowSelection'] = {
    columnWidth: 48,
    type: 'checkbox',
    fixed: true,
    selectedRowKeys: checkedRowKeys,
    onChange: onSelectChange
  };

  /** the hook after the batch delete operation is completed */
  async function onBatchDeleted() {
    window.$message?.success(t('common.deleteSuccess'));
    setCheckedRowKeys([]);

    await getData(false);
  }

  /** the hook after the delete operation is completed */
  async function onDeleted() {
    window.$message?.success(t('common.deleteSuccess'));

    await getData(false);
  }

  return {
    drawerVisible,
    openDrawer,
    closeDrawer,
    operateType,
    handleAdd,
    editingData,
    handleEdit,
    checkedRowKeys,
    onSelectChange,
    rowSelection,
    onBatchDeleted,
    onDeleted
  };
}

export function useTableScroll(scrollX: number = 702) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const size = useSize(tableWrapperRef);

  const height = size?.height;

  const result = height && height < 600 ? height - 160 : undefined;

  const scrollConfig = {
    y: result,
    x: scrollX
  };

  return {
    tableWrapperRef,
    scrollConfig
  };
}
