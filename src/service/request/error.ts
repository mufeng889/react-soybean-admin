import type { FlatRequestInstance } from '@sa/axios';
import { BACKEND_ERROR_CODE } from '@sa/axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { $t } from '@/locales';
import { store } from '@/store';
import { resetStore } from '@/store/slice/auth';

import { getAuthorization, handleExpiredRequest, showErrorMsg } from './shared';
import type { RequestInstanceState } from './type';

/** - 后端错误处理 */
export async function backEndFail(
  response: AxiosResponse<App.Service.Response<unknown>, any>,
  instance: AxiosInstance,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  const responseCode = String(response.data.code);

  function handleLogout() {
    store.dispatch(resetStore());
  }

  function logoutAndCleanup() {
    handleLogout();
    window.removeEventListener('beforeunload', handleLogout);

    request.state.errMsgStack = request.state.errMsgStack.filter(msg => msg !== response.data.msg);
  }

  // when the backend response code is in `logoutCodes`, it means the user will be logged out and redirected to login page
  const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
  if (logoutCodes.includes(responseCode)) {
    handleLogout();
    return null;
  }

  // when the backend response code is in `modalLogoutCodes`, it means the user will be logged out by displaying a modal
  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(responseCode) && !request.state.errMsgStack?.includes(response.data.msg)) {
    request.state.errMsgStack = [...(request.state.errMsgStack || []), response.data.msg];

    // prevent the user from refreshing the page
    window.addEventListener('beforeunload', handleLogout);

    window.$modal?.error({
      content: response.data.msg,
      keyboard: false,
      maskClosable: false,
      okText: $t('common.confirm'),
      onClose() {
        logoutAndCleanup();
      },
      onOk() {
        logoutAndCleanup();
      },
      title: $t('common.error')
    });

    return null;
  }

  // when the backend response code is in `expiredTokenCodes`, it means the token is expired, and refresh token
  // the api `refreshToken` can not return error code in `expiredTokenCodes`, otherwise it will be a dead loop, should return `logoutCodes` or `modalLogoutCodes`
  // when the backend response code is in `expiredTokenCodes`, it means the token is expired, and refresh token
  // the api `refreshToken` can not return error code in `expiredTokenCodes`, otherwise it will be a dead loop, should return `logoutCodes` or `modalLogoutCodes`
  const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
  if (expiredTokenCodes.includes(responseCode)) {
    const success = await handleExpiredRequest(request.state);
    if (success) {
      const Authorization = getAuthorization();
      Object.assign(response.config.headers, { Authorization });

      return instance.request(response.config) as Promise<AxiosResponse>;
    }
  }

  return null;
}

/** - 网络错误处理 */
export function handleError(
  error: AxiosError<App.Service.Response<unknown>, any>,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  // when the request is fail, you can show error message

  let message = error.message;
  let backendErrorCode = '';

  // get backend error message and code
  if (error.code === BACKEND_ERROR_CODE) {
    message = error.response?.data?.msg || message;
    backendErrorCode = String(error.response?.data?.code || '');
  }

  // the error message is displayed in the modal
  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(backendErrorCode)) {
    return;
  }

  // when the token is expired, refresh token and retry request, so no need to show error message
  const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
  if (expiredTokenCodes.includes(backendErrorCode)) {
    return;
  }

  showErrorMsg(request.state, message);
}
