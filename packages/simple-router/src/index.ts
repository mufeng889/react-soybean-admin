import CreateRouter from './router';

import { useRouter } from './hooks/useRouter';
import type { RouteRecordNormalized } from './matcher/types';

export default CreateRouter;

export { useRouter };

export type { RouteRecordNormalized };

export type { CreateRouter as Router };

export type {
  LocationQueryValueRaw,
  RouteLocationNamedRaw,
  AfterEach,
  BeforeEach,
  RouteLocationNormalizedLoaded as Route
} from './types';
