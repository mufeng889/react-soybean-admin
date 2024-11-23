import useBoolean from './use-boolean';

/**
 * Loading
 *
 * @param initValue Init value
 */
export default function useLoading(initValue = false) {
  const { bool: loading, setFalse: endLoading, setTrue: startLoading } = useBoolean(initValue);

  return {
    endLoading,
    loading,
    startLoading
  };
}
