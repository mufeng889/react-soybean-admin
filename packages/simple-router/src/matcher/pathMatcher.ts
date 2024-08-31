import type { RouteRecordNormalized, RouteRecordRaw } from './types';
export function createRouteRecordMatcher(record: RouteRecordNormalized, parent?: RouteRecordRaw) {
  const matcher: RouteRecordRaw = {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    name: record.name
  };

  if (parent) {
    parent.children.push(matcher);
  }

  return matcher;
}

export function isRouteName(name: any) {
  return typeof name === 'string';
}
