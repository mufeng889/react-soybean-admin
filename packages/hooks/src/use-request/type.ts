import type { DependencyList } from 'react';
import type { FlatResponseData } from '@sa/axios';
import type { AxiosError } from 'axios';
import type Fetch from './Fetch';
import type { CachedData } from './utils/cache';

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;
export type Subscribe = () => void;

// for Fetch

export interface FetchState<TData extends FlatResponseData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  response: TData['response'];
  data: null | TData['data'];
  error: AxiosError | null;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<FlatResponseData, TParams>>)
    | null;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: AxiosError, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: AxiosError) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

// for useRequestImplement

export interface Options<TData extends FlatResponseData, TParams extends any[]> {
  manual?: boolean;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData['data'], params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data: TData['data'] | null, e: Error | null) => void;
  defaultParams?: TParams;
  // refreshDeps
  refreshDeps?: DependencyList;
  refreshDepsAction?: () => void;

  // loading delay
  loadingDelay?: number;

  // polling
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  pollingErrorRetryCount?: number;

  // refresh on window focus
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;

  // debounce
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;
  debounceMaxWait?: number;

  // throttle
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;

  // cache
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
  setCache?: (data: CachedData<TData, TParams>) => void;
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined;

  // retry
  retryCount?: number;
  retryInterval?: number;

  // ready
  ready?: boolean;

  // [key: string]: any;
}

export type Plugin<TData extends FlatResponseData, TParams extends any[]> = {
  (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};

export interface Result<TData extends FlatResponseData, TParams extends any[]> extends FetchState<TData, TParams> {
  cancel: Fetch<TData, TParams>['cancel'];
  refresh: Fetch<TData, TParams>['refresh'];
  refreshAsync: Fetch<TData, TParams>['refreshAsync'];
  run: Fetch<TData, TParams>['run'];
  runAsync: Fetch<TData, TParams>['runAsync'];
  mutate: Fetch<TData, TParams>['mutate'];
}

export type Timeout = ReturnType<typeof setTimeout>;
