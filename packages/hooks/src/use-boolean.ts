import { useState } from 'react';

/**
 * Boolean
 *
 * @param initValue Init value
 */
export default function useBoolean(initValue = false) {
  const [bool, setBool] = useState(initValue);

  function setTrue() {
    setBool(true);
  }
  function setFalse() {
    setBool(false);
  }
  function toggle() {
    setBool(state => !state);
  }

  return {
    bool,
    setBool,
    setFalse,
    setTrue,
    toggle
  };
}
