import { createRouter } from './router';
import { useRouter } from './hooks/useRouter';
import RouterProvider from './Component';
import type { RouteRecordNormalized } from './matcher/types';

export { useRouter, createRouter, RouterProvider };

export type { RouteRecordNormalized };

export type {
  LocationQueryValueRaw,
  RouteLocationNamedRaw,
  AfterEach,
  BeforeEach,
  RouteLocationNormalizedLoaded,
  Route
} from './types';
