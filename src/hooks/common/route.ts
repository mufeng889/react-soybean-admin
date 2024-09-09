import { useMatches } from 'react-router-dom';
import type { Route } from '@sa/simple-router';
import { router } from '@/router';

export function useRoute(): Route {
  const customRoute = useSyncExternalStore(router.subscribe, router.getSnapshot);

  const matches = useMatches();

  const params = matches[matches.length - 1].params;

  const route = Object.assign(customRoute, { params }) as Route;

  return route;
}
