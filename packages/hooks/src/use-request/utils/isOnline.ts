import { isBrowser } from '.';

export default function isOnline(): boolean {
  if (isBrowser && typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}
