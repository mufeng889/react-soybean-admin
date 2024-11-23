import { useUpdateEffect } from 'ahooks';
import { useRef } from 'react';

import type { Plugin } from '../type';

// support refreshDeps & ready
const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { defaultParams = [], manual, ready = true, refreshDeps = [], refreshDepsAction }
) => {
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;

  useUpdateEffect(() => {
    if (!manual && ready) {
      hasAutoRun.current = true;
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  useUpdateEffect(() => {
    if (hasAutoRun.current) {
      return;
    }
    if (!manual) {
      hasAutoRun.current = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  }, [...refreshDeps]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true
        };
      }
      return null;
    }
  };
};

useAutoRunPlugin.onInit = ({ manual, ready = true }) => {
  return {
    loading: !manual && ready
  };
};

export default useAutoRunPlugin;
