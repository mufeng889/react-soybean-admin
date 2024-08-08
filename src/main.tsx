import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackRender from '@/components/common/ErrorBoundary.tsx';
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
  if (container) {
    const root = createRoot(container);
    root.render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    );
  } else {
    throw new Error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
  }
}

setupApp();
