import CreateRouter from './router';
import { useRoute } from './hooks/useRoute';
import { useRouter } from './hooks/useRouter';
import type { AfterEach, BeforeEach, RouteLocationNormalizedLoaded } from './types';
import type { RouteRecordNormalized } from './matcher/types';

export default CreateRouter;

export { useRoute, useRouter };

export type { RouteLocationNormalizedLoaded, RouteRecordNormalized, BeforeEach, AfterEach };
