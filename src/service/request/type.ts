export interface RequestInstanceState {
  /** the request error message stack */
  errMsgStack: string[];
  /** whether the request is refreshing token */
  refreshTokenFn: Promise<boolean> | null;
}
