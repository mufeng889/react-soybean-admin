import type { Route } from '@sa/simple-router';
import { router } from '@/router';

export function useRoute(): Route {
  return useSyncExternalStore(router.subscribe, router.getSnapshot);
}
