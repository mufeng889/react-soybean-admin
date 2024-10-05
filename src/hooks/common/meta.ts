import { useMatches } from 'react-router-dom';

/** - get route meta */
export function useMeta() {
  const matches = useMatches();

  return matches.at(-1)?.handle;
}
