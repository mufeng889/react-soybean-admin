import type { ElegantConstRoute } from '@ohh-889/react-auto-route';
import type { Location, RouteObject } from 'react-router-dom';
import type { AgnosticDataRouteMatch } from '@remix-run/router';
import type { RouteRecordNormalized, RouteRecordRaw } from '../matcher/types';
import type { RouteLocationNormalizedLoaded } from '../types';
import { parseQuery } from '../query';

export function cleanParams(params: Record<string, any> | undefined): Record<string, any> {
  if (!params) return {};
  return Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null));
}

export function getFullPath(route: RouteRecordNormalized | ElegantConstRoute): string {
  // 如果当前 route 存在并且有 children
  if (route && route.redirect && route.children && route.children.length > 0) {
    // 获取第一个子路由
    const firstChild = route.children.find(child => child.path === route.redirect);
    // 递归调用，继续拼接子路由的 path
    if (firstChild) return `${route.path}/${getFullPath(firstChild)}`;
  }
  // 如果没有 children，返回当前 route 的 path
  return route.path;
}

export function findParentNames(matched: RouteRecordRaw | undefined): (string | undefined)[] {
  const parentNames: (string | undefined)[] = [];

  function helper(current: RouteRecordRaw | undefined) {
    if (current?.parent) {
      helper(current.parent);
    }
    parentNames.push(current?.name);
  }

  helper(matched);

  return parentNames;
}

export function removeElement(arr: RouteObject[], name: string | undefined) {
  const index = arr.findIndex(route => route.id === name);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function transformLocationToFullPath(location: Location) {
  return location.pathname + location.search + location.hash;
}

export function transformLocationToRoute(
  location: Location,
  match: AgnosticDataRouteMatch[]
): RouteLocationNormalizedLoaded {
  const { hash, pathname, search, state } = location;
  const lastMatch = match.at(-1);

  return {
    path: pathname,
    fullPath: pathname + search + hash,
    query: parseQuery(search),
    hash,
    meta: lastMatch?.route.handle,
    name: lastMatch?.route.id,
    params: Object.keys(lastMatch?.params || {}).filter(key => key !== '*'),
    state,
    matched: [],
    redirectedFrom: undefined
  };
}
