import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from '../ErrorBoundary.tsx';
import { store } from '@/store';
import App from './App.tsx';
import './plugins/assets';
import { setupI18n } from './locales';
import { setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';

function setupApp() {


  setupI18n();

  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const container = document.getElementById('root');
  if (!container) return ;
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



