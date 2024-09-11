import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/store';
import { setupRouter } from '@/router';
import FallbackRender from '../ErrorBoundary.tsx';
import App from './App.tsx';
import './plugins/assets';
import { setupI18n } from './locales';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';

function setupApp() {
  setupI18n();

  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupRouter();

  setupDayjs();

  setupAppVersionNotification();

  const container = document.getElementById('root');
  if (!container) return;
  const root = createRoot(container);
  root.render(
    <ErrorBoundary fallbackRender={FallbackRender}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
}

setupApp();
