import { useMatches } from 'react-router-dom';

export function useMeta() {
  const matches = useMatches();

  return matches.at(-1)?.handle;
}
