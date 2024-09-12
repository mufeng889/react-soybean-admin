import { useRouter } from './hooks/useRouter';
import RouterProvider from './Component';
import type { RouteRecordNormalized } from './matcher/types';

export { useRouter, RouterProvider };

export { createRouter } from './router';

export type { Mode, Options, RouterOptions, Router } from './router';

export type { RouteRecordNormalized };

export * from './types';
