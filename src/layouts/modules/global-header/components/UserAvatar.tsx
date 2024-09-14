import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useSubmit } from 'react-router-dom';
import { useRoute } from '@sa/simple-router';
import { selectToken, selectUserInfo } from '@/store/slice/auth';

const UserAvatar = memo(() => {
  const token = useAppSelector(selectToken);
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectUserInfo);
  const submit = useSubmit();
  const route = useRoute();
  const router = useRouterPush();

  function logout() {
    window?.$modal?.confirm({
      title: t('common.tip'),
      content: t('common.logoutConfirm'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        let needRedirect = false;
        if (!route.meta?.constant) needRedirect = true;
        submit({ redirectFullPath: route.fullPath, needRedirect }, { method: 'post', action: '/logout' });
      }
    });
  }

  function onClick({ key }: { key: string }) {
    if (key === '1') {
      logout();
    } else {
      router.routerPushByKey('user-center');
    }
  }
  function loginOrRegister() {
    router.routerPushByKey('login');
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            icon="ph:user-circle"
            className="text-icon"
          />
          {t('common.userCenter')}
        </div>
      ),
      key: '0'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            icon="ph:sign-out"
            className="text-icon"
          />
          {t('common.logout')}
        </div>
      ),
      key: '1'
    }
  ];
  return token ? (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{ items, onClick }}
    >
      <div>
        <ButtonIcon className="px-12px">
          <SvgIcon
            icon="ph:user-circle"
            className="text-icon-large"
          />
          <span className="text-16px font-medium">{userInfo.userName}</span>
        </ButtonIcon>
      </div>
    </Dropdown>
  ) : (
    <Button onClick={loginOrRegister}>{t('page.login.common.loginOrRegister')}</Button>
  );
});

export default UserAvatar;
