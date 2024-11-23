// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { ElegantConstRoute } from '@ohh-889/react-auto-route';

import type { LocationQuery } from '../types';
import { warn } from '../warning';

import type { RouteRecordNormalized } from './types';

export function objectToQueryParams(params: { [key: string]: string | number }): string {
  const queryParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined) {
      queryParams.set(key, params[key].toString());
    }
  }

  return queryParams.toString();
}

export function generatePath(pathTemplate: string, params: { [key: string]: string | number }): string {
  let path = pathTemplate.replace(/:([a-zA-Z]+)/g, (_, p1) => {
    if (p1 in params) {
      return params[p1].toString();
    }
    // eslint-disable-next-line no-console
    console.warn(`Parameter "${p1}" not found in params object`);
    return '';
  });

  // 删除路径中的多余斜杠
  path = path.replace(/\/+/g, '/');

  // 如果路径以斜杠结尾，删除结尾的斜杠
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path;
}

export function normalizeRouteRecord(record: ElegantConstRoute): RouteRecordNormalized {
  return {
    children:
      record.children?.map(child => {
        child.redirect ||= child.children && child.children[0].path;
        return child;
      }) || [],
    meta: record.meta || {},
    name: record.name,
    path: record.path || '',
    redirect: record.redirect || (record.children && record.children[0].path)
  };
}

/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */
export function checkChildMissingNameWithEmptyPath(mainNormalizedRecord: RouteRecordNormalized, parent?: any) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(
      `The route named "${String(
        parent.record.name
      )}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`
    );
  }
}

export function getQueryParams(search: string): LocationQuery {
  const params: LocationQuery = {};
  const queryParams = new URLSearchParams(search);
  for (const [key, value] of queryParams) {
    params[key] = value;
  }
  return params;
}

export function mergeMetaFields(matched: RouteRecordNormalized[]) {
  return matched.reduce((meta, record) => Object.assign(meta, record.meta), {});
}

/**
 * Cleans and filters out null/undefined parameters.
 *
 * @param params - The raw parameters.
 * @returns The cleaned parameters.
 */
export function cleanParams(params: Record<string, any>): Record<string, string | number> {
  return Object.keys(params).reduce(
    (acc, key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        acc[key] = Array.isArray(value) ? value.join(',') : value;
      }
      return acc;
    },
    {} as Record<string, string | number>
  );
}
