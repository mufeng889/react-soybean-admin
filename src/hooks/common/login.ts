import { useLoading } from '@sa/hooks';
import { useTranslation } from 'react-i18next';
import { getUerName, login, resetStore } from '@/store/slice/auth';
import { initAuthRoute } from '@/store/slice/route';
import { useAppDispatch } from '../business/useStore';
import { useRouterPush } from './routerPush';

export function useLogin() {
  const { loading, startLoading, endLoading } = useLoading();
  const { redirectFromLogin } = useRouterPush();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  async function toLogin(params: { userName: string; password: string }, redirect = true) {
    startLoading();
    await dispatch(login(params));
    const userName = dispatch(getUerName());

    if (userName) {
      await dispatch(initAuthRoute());

      if (redirect) {
        await redirectFromLogin(redirect);
      }

      window.$notification?.success({
        message: t('page.login.common.loginSuccess'),
        description: t('page.login.common.welcomeBack', { userName })
      });
    } else {
      dispatch(resetStore());
    }
    endLoading();
  }

  return {
    loading,
    toLogin
  };
}
