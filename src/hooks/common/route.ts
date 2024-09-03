import { useMatches } from 'react-router-dom';
import { router } from '@/router';

export function useRoute() {
  const customRoute = useSyncExternalStore(router.subscribe, router.getSnapshot);

  const matches = useMatches();

  const params = matches[matches.length - 1].params;

  const route = Object.assign(customRoute, { params });

  return route;
}
