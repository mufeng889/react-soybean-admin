import { request } from '../request';

export const api = [
  {
    login: (userName: string, password: string) =>
      request<Api.Auth.LoginToken>({
        data: {
          password,
          userName
        },
        method: 'post',
        url: '/auth/login'
      })
  }
];
