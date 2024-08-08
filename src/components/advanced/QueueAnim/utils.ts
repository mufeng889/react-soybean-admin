/* eslint no-prototype-builtins: 0 */
import React from 'react';
import type { IObject } from './type';

export const windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);

export function toArrayChildren(children: any) {
  const ret: any[] = [];
  React.Children.forEach(children, c => {
    ret.push(c);
  });
  return ret;
}

export function findChildInChildrenByKey(children: any[], key: string) {
  let ret: any = null;
  if (children) {
    children.forEach(c => {
      if (ret || !c) {
        return;
      }
      if (c.key === key) {
        ret = c;
      }
    });
  }
  return ret;
}

export function mergeChildren(prev: any, next: any) {
  let ret: any = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  const nextChildrenPending: IObject = {};
  let pendingChildren: any = [];
  let followChildrenKey: any;
  prev.forEach((c: any) => {
    if (!c) {
      return;
    }
    if (findChildInChildrenByKey(next, c.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[c.key] = pendingChildren;
        pendingChildren = [];
      }
      followChildrenKey = c.key;
    } else if (c.key) {
      pendingChildren.push(c);
    }
  });
  if (!followChildrenKey) {
    ret = ret.concat(pendingChildren);
  }
  next.forEach((c: any) => {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) {
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

export function transformArguments(arg: any, key: string | number, i: number) {
  let result;
  if (typeof arg === 'function') {
    result = arg({
      key,
      index: i
    });
  } else {
    result = arg;
  }
  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }
    return [result[0], result[0]];
  }
  return [result, result];
}
