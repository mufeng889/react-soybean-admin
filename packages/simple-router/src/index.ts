import CreateRouter from './router';
import { useRoute } from './hooks/useRoute';
import { useRouter } from './hooks/useRouter';
import type { RouteRecordNormalized } from './matcher/types';

export default CreateRouter;

export { useRoute, useRouter };

export type { RouteRecordNormalized };

export type {
  LocationQueryValueRaw,
  RouteLocationNamedRaw,
  AfterEach,
  BeforeEach,
  RouteLocationNormalizedLoaded
} from './types';
