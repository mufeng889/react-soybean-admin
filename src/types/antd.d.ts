declare namespace AntDesign {
  type TableColumnType<T> = import('antd').TableColumnType<T>;
  type TableColumnGroupType<T> = import('antd').TableColumnGroupType<T>;
  type TablePaginationConfig = import('antd').TablePaginationConfig;
  type TableColumnCheck = import('@sa/hooks').TableColumnCheck;
  type TableDataWithIndex<T> = import('@sa/hooks').TableDataWithIndex<T>;
  type FlatResponseData<T> = import('@sa/axios').FlatResponseData<T>;

  type TableData = Api.Common.CommonRecord<object>;

  /**
   * the custom column key
   *
   * if you want to add a custom column, you should add a key to this type
   */
  type CustomColumnKey = 'operate';

  type SetTableColumnKey<C, T> = Omit<C, 'key'> & { key?: keyof T | CustomColumnKey };

  type TableColumn<T> = SetTableColumnKey<TableColumnType<T>, T> | SetTableColumnKey<TableColumnGroupType<T>, T>;

  type TableApiFn<T = any, R = Api.Common.CommonSearchParams> = (
    params: R
  ) => Promise<FlatResponseData<Api.Common.PaginatingQueryRecord<T>>>;

  /**
   * the type of table operation
   *
   * - add: add table item
   * - edit: edit table item
   */
  type TableOperateType = 'add' | 'edit';

  type GetTableData<A extends TableApiFn> = A extends TableApiFn<infer T> ? T : never;

  type AntDesignTableConfig<A extends TableApiFn> = Pick<
    import('@sa/hooks').TableConfig<A, GetTableData<A>, TableColumn<TableDataWithIndex<GetTableData<A>>>>,
    'apiFn' | 'apiParams' | 'columns' | 'immediate'
  > & { rowKey?: keyof GetTableData<A> };
}
