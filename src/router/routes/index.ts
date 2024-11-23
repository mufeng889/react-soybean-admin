import type { CustomRoute, ElegantRoute } from '@elegant-router/types';

import { generatedRoutes } from '../elegant/routes';

/**
 * custom routes
 *
 * @link https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
 */
const customRoutes: CustomRoute[] = [
  {
    children: [
      {
        component: 'view.403',
        meta: {
          i18nKey: 'route.exception_403',
          icon: 'ic:baseline-block',
          title: 'exception_403'
        },
        name: 'exception_403',
        path: '403'
      },
      {
        component: 'view.404',
        meta: {
          i18nKey: 'route.exception_404',
          icon: 'ic:baseline-web-asset-off',
          title: 'exception_404'
        },
        name: 'exception_404',
        path: '404'
      },
      {
        component: 'view.500',
        meta: {
          i18nKey: 'route.exception_500',
          icon: 'ic:baseline-wifi-off',
          title: 'exception_500'
        },
        name: 'exception_500',
        path: '500'
      }
    ],
    component: 'layout.base',
    meta: {
      i18nKey: 'route.exception',
      icon: 'ant-design:exception-outlined',
      order: 7,
      title: 'exception'
    },
    name: 'exception',
    path: '/exception'
  },
  {
    children: [
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_antd',
          icon: 'logos:ant-design',
          order: 7,
          title: 'document_antd'
        },
        name: 'document_antd',
        path: 'antd',
        props: {
          url: 'https://ant.design/index-cn'
        }
      },
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_procomponents',
          icon: 'logos:ant-design',
          order: 8,
          title: 'document_procomponents'
        },
        name: 'document_procomponents',
        path: 'procomponents',
        props: {
          url: 'https://pro-components.antdigital.dev/'
        }
      },
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_project',
          localIcon: 'logo',
          order: 1,
          title: 'document_project'
        },
        name: 'document_project',
        path: 'project',
        props: {
          url: 'https://react-soybean-docs.pages.dev/index-cn?theme=dark'
        }
      },
      {
        component: 'view.iframe-page',
        meta: {
          href: 'https://react-soybean-docs.pages.dev/index-cn?theme=dark',
          i18nKey: 'route.document_project-link',
          localIcon: 'logo',
          order: 2,
          title: 'document_project-link'
        },
        name: 'document_project-link',
        path: 'project-link'
      },
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_unocss',
          icon: 'logos:unocss',
          order: 5,
          title: 'document_unocss'
        },
        name: 'document_unocss',
        path: 'unocss',
        props: {
          url: 'https://unocss.dev/'
        }
      },
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_vite',
          icon: 'logos:vitejs',
          order: 4,
          title: 'document_vite'
        },
        name: 'document_vite',
        path: 'vite',
        props: {
          url: 'https://cn.vitejs.dev/'
        }
      },
      {
        component: 'view.iframe-page',
        meta: {
          i18nKey: 'route.document_react',
          icon: 'logos:react',
          order: 3,
          title: 'document_react'
        },
        name: 'document_react',
        path: 'react',
        props: {
          url: 'https://react.dev/'
        }
      }
    ],
    component: 'layout.base',
    meta: {
      i18nKey: 'route.document',
      icon: 'mdi:file-document-multiple-outline',
      order: 2,
      title: 'document'
    },
    name: 'document',
    path: '/document'
  }
];

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: ElegantRoute[] = [];

  const authRoutes: ElegantRoute[] = [];

  [...customRoutes, ...generatedRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }
  });

  return {
    authRoutes,
    constantRoutes
  };
}
