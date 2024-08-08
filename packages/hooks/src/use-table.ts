import { useEffect, useRef, useState } from 'react';
import useBoolean from './use-boolean';
import useLoading from './use-loading';
export type MaybePromise<T> = T | Promise<T>;

export type ApiFn = (args: any) => Promise<unknown>;

export type TableColumnCheck = {
  key: string;
  title: string;
  checked: boolean;
};

export type TableDataWithIndex<T> = T & { index: number };

export type TransformedData<T> = {
  data: TableDataWithIndex<T>[];
  pageNum: number;
  pageSize: number;
  total: number;
};

export type Transformer<T, Response> = (response: Response) => TransformedData<T>;

export type TableConfig<A extends ApiFn, T, C> = {
  /** api function to get table data */
  apiFn: A;
  /** api params */
  apiParams?: Parameters<A>[0];
  /** transform api response to table data */
  transformer: Transformer<T, Awaited<ReturnType<A>>>;
  /** columns factory */
  columns: () => C[];
  /**
   * get column checks
   *
   * @param columns
   */
  getColumnChecks: (columns: C[]) => TableColumnCheck[];
  /**
   * get columns
   *
   * @param columns
   */
  getColumns: (columns: C[], checks: TableColumnCheck[]) => C[];
  /**
   * callback when response fetched
   *
   * @param transformed transformed data
   */
  onFetched?: (transformed: TransformedData<T>) => MaybePromise<void>;
  /**
   * whether to get data immediately
   *
   * @default true
   */
  immediate?: boolean;
};

export default function useHookTable<A extends ApiFn, T, C>(config: TableConfig<A, T, C>) {
  const { apiFn, apiParams, transformer, immediate = true, getColumnChecks, getColumns } = config;

  const { loading, startLoading, endLoading } = useLoading();

  const { bool: empty, setBool: setEmpty } = useBoolean();

  const searchParams = useRef<Parameters<A>[0]>(apiParams);

  const allColumns: C[] = config.columns();

  const [data, setData] = useState<TableDataWithIndex<T>[]>([]);

  const [columnChecks, setColumnChecks] = useState<TableColumnCheck[]>(getColumnChecks(allColumns));

  const columns = getColumns(allColumns, columnChecks);

  async function getData() {
    startLoading();

    const formattedParams = formatSearchParams(searchParams.current);

    const response = await apiFn(formattedParams);

    const transformed = transformer(response as Awaited<ReturnType<A>>);

    setData(transformed.data);

    setEmpty(transformed.data.length === 0);

    await config.onFetched?.(transformed);

    endLoading();
  }

  /**
   * update search params
   *
   * @param params
   */
  function updateSearchParams(params: Partial<Parameters<A>[0]> | { current?: number }) {
    Object.assign(searchParams.current, params);
    getData();
  }

  /** reset search params */
  function resetSearchParams() {
    Object.assign(searchParams.current, apiParams);
    getData();
  }

  useEffect(() => {
    if (immediate) getData();
  }, []);

  return {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    getData,
    searchParams,
    updateSearchParams,
    resetSearchParams,
    setColumnChecks
  };
}

function formatSearchParams(params: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null && value !== undefined));
}
