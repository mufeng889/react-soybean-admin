import type { CreateAxiosDefaults } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import { stringify } from 'qs';

import { isHttpSuccess } from './shared';
import type { RequestOption } from './type';

export function createDefaultOptions<ResponseData = any>(options?: Partial<RequestOption<ResponseData>>) {
  const opts: RequestOption<ResponseData> = {
    isBackendSuccess: _response => true,
    onBackendFail: async () => {},
    onError: async () => {},
    onRequest: async config => config,
    transformBackendResponse: async response => response.data
  };

  Object.assign(opts, options);

  return opts;
}

export function createRetryOptions(config?: Partial<CreateAxiosDefaults>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 0,
    retryDelay: () => 1000,
    shouldResetTimeout: true
  };

  Object.assign(retryConfig, config);

  return retryConfig;
}

export function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const TEN_SECONDS = 10 * 1000;

  const axiosConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json'
    },
    paramsSerializer: params => {
      return stringify(params);
    },
    timeout: TEN_SECONDS,
    validateStatus: isHttpSuccess
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}
