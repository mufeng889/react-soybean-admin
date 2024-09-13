export const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';

export const isBrowser = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

export const isDev = import.meta.env.NODE_ENV === 'development' || import.meta.env.env.NODE_ENV === 'test';
