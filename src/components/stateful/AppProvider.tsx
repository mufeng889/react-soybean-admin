import { App } from 'antd';

import { cacheTabs } from '@/store/slice/tab';
import { cacheThemeSettings } from '@/store/slice/theme';

function ContextHolder() {
  const { message, modal, notification } = App.useApp();
  window.$message = message;
  window.$modal = modal;
  window.$notification = notification;
  return null;
}

const AppProvider = memo(({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEventListener(
    'beforeunload',
    () => {
      dispatch(cacheTabs());
      dispatch(cacheThemeSettings());
    },
    { target: window }
  );

  return (
    <App className="h-full">
      <ContextHolder />
      {children}
    </App>
  );
});

export default AppProvider;
