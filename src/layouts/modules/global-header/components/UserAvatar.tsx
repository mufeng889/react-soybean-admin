import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { resetStore, selectToken, selectUserInfo } from '@/store/slice/auth';
import ButtonIcon from '@/components/custom/button-icon';
import SvgIcon from '@/components/custom/svg-icon';

const UserAvatar = memo(() => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  function logout() {
    window?.$modal?.confirm({
      title: t('common.tip'),
      content: t('common.logoutConfirm'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        loginOrRegister();
      }
    });
  }

  function onClick({ key }: { key: string }) {
    if (key === '1') {
      logout();
    } else {
      navigate('/user-center');
    }
  }
  function loginOrRegister() {
    dispatch(resetStore());
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
        <ButtonIcon>
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
