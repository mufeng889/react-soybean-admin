import { createElement } from 'react';
import { Button } from 'antd';
import { $t } from '../locales';

export function setupAppVersionNotification() {
  const canAutoUpdateApp = import.meta.env.VITE_AUTOMATICALLY_DETECT_UPDATE === 'Y';

  if (!canAutoUpdateApp) return;

  let isShow = false;

  document.addEventListener('visibilitychange', async () => {
    const preConditions = [!isShow, document.visibilityState === 'visible', !import.meta.env.DEV];

    if (!preConditions.every(Boolean)) return;

    const buildTime = await getHtmlBuildTime();

    if (buildTime === BUILD_TIME) return;

    isShow = true;

    window.$notification?.open({
      message: $t('system.updateTitle'),
      description: $t('system.updateContent'),
      btn: (() => {
        return createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'end', gap: '12px', width: '325px' } },
          [
            createElement(
              Button,

              {
                onClick() {
                  window.$notification?.destroy();
                },
                key: 'cancel'
              },
              $t('system.updateCancel')
            ),
            createElement(
              Button,
              {
                type: 'primary',
                onClick() {
                  location.reload();
                },
                key: 'ok'
              },
              $t('system.updateConfirm')
            )
          ]
        );
      })(),
      onClose() {
        isShow = false;
      }
    });
  });
}

async function getHtmlBuildTime() {
  const res = await fetch(`/index.html?time=${Date.now()}`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || '';

  return buildTime;
}
