import type { CustomRoute, ElegantRoute } from '@elegant-router/types';
import { generatedRoutes } from '../elegant/routes';

/**
 * custom routes
 *
 * @link https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
 */
const customRoutes: CustomRoute[] = [
  {
    name: 'exception',
    path: '/exception',
    component: 'layout.base',
    meta: {
      title: 'exception',
      i18nKey: 'route.exception',
      icon: 'ant-design:exception-outlined',
      order: 7
    },
    children: [
      {
        name: 'exception_403',
        path: '403',
        component: 'view.403',
        meta: {
          title: 'exception_403',
          i18nKey: 'route.exception_403',
          icon: 'ic:baseline-block'
        }
      },
      {
        name: 'exception_404',
        path: '404',
        component: 'view.404',
        meta: {
          title: 'exception_404',
          i18nKey: 'route.exception_404',
          icon: 'ic:baseline-web-asset-off'
        }
      },
      {
        name: 'exception_500',
        path: '500',
        component: 'view.500',
        meta: {
          title: 'exception_500',
          i18nKey: 'route.exception_500',
          icon: 'ic:baseline-wifi-off'
        }
      }
    ]
  },
  {
    name: 'document',
    path: '/document',
    component: 'layout.base',
    meta: {
      title: 'document',
      i18nKey: 'route.document',
      order: 2,
      icon: 'mdi:file-document-multiple-outline'
    },
    children: [
      {
        name: 'document_antd',
        path: 'antd',
        component: 'view.iframe-page',
        props: {
          url: 'https://ant.design/index-cn'
        },
        meta: {
          title: 'document_antd',
          i18nKey: 'route.document_antd',
          order: 7,
          icon: 'logos:ant-design'
        }
      },
      {
        name: 'document_procomponents',
        path: 'procomponents',
        component: 'view.iframe-page',
        props: {
          url: 'https://pro-components.antdigital.dev/'
        },
        meta: {
          title: 'document_procomponents',
          i18nKey: 'route.document_procomponents',
          order: 8,
          icon: 'logos:ant-design'
        }
      },
      {
        name: 'document_project',
        path: 'project',
        component: 'view.iframe-page',
        props: {
          url: 'https://react-soybean-docs.pages.dev/index-cn?theme=dark'
        },
        meta: {
          title: 'document_project',
          i18nKey: 'route.document_project',
          order: 1,
          localIcon: 'logo'
        }
      },
      {
        name: 'document_project-link',
        path: 'project-link',
        component: 'view.iframe-page',
        meta: {
          title: 'document_project-link',
          i18nKey: 'route.document_project-link',
          order: 2,
          localIcon: 'logo',
          href: 'https://react-soybean-docs.pages.dev/index-cn?theme=dark'
        }
      },
      {
        name: 'document_unocss',
        path: 'unocss',
        component: 'view.iframe-page',
        props: {
          url: 'https://unocss.dev/'
        },
        meta: {
          title: 'document_unocss',
          i18nKey: 'route.document_unocss',
          order: 5,
          icon: 'logos:unocss'
        }
      },
      {
        name: 'document_vite',
        path: 'vite',
        component: 'view.iframe-page',
        props: {
          url: 'https://cn.vitejs.dev/'
        },
        meta: {
          title: 'document_vite',
          i18nKey: 'route.document_vite',
          order: 4,
          icon: 'logos:vitejs'
        }
      },
      {
        name: 'document_react',
        path: 'react',
        component: 'view.iframe-page',
        props: {
          url: 'https://react.dev/'
        },
        meta: {
          title: 'document_react',
          i18nKey: 'route.document_react',
          order: 3,
          icon: 'logos:react'
        }
      }
    ]
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
    constantRoutes,
    authRoutes
  };
}
