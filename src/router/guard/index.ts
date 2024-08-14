import type { AfterEach, BeforeEach } from '@sa/simple-router';
import { $t } from '@/locales';
/**
 * create route guard
 *
 * @param router router instance
 */
export const createRouteGuard: BeforeEach = (to, _, next) => {
  window.NProgress?.start?.();

  if (to.meta.href) {
    window.open(to.meta.href, '_blank');

    return next(true);
  }
  return next();
};

export const afterEach: AfterEach = to => {
  const { i18nKey, title } = to.meta;

  const documentTitle = i18nKey ? $t(i18nKey) : title;
  document.title = documentTitle ?? 'React-Soybean';
  window.NProgress?.done?.();
};
