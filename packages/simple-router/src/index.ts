import RouterProvider from './Component';
import { useRoute } from './hooks/useRoute';
import { useRouter } from './hooks/useRouter';
import type { RouteRecordNormalized } from './matcher/types';

export { createRouter } from './router';

export type { Mode, Options, Router, RouterOptions } from './router';

export * from './types';

export { RouterProvider, useRoute, useRouter };

export type { RouteRecordNormalized };
