/** The common type namespace */
declare namespace CommonType {
  /** The strategic pattern */
  interface StrategicPattern {
    /** If the condition is true, then call the action function */
    callback: () => boolean;
    /** The condition */
    condition: boolean;
  }

  /**
   * The option type
   *
   * @property value: The option value
   * @property label: The option label
   */
  type Option<K = string> = { label: string; value: K };

  type YesOrNo = 'N' | 'Y';

  /** add null to all properties */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };
}
