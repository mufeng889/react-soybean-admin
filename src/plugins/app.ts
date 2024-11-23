import { Button } from 'antd';
import { createElement } from 'react';

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
      btn: (() => {
        return createElement(
          'div',
          { style: { display: 'flex', gap: '12px', justifyContent: 'end', width: '325px' } },
          [
            createElement(
              Button,

              {
                key: 'cancel',
                onClick() {
                  window.$notification?.destroy();
                }
              },
              $t('system.updateCancel')
            ),
            createElement(
              Button,
              {
                key: 'ok',
                onClick() {
                  location.reload();
                },
                type: 'primary'
              },
              $t('system.updateConfirm')
            )
          ]
        );
      })(),
      description: $t('system.updateContent'),
      message: $t('system.updateTitle'),
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
