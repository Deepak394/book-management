import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncQueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function useAsyncQuery<T>(fetcher: () => Promise<T>, key: unknown, enabled = true) {
  const [state, setState] = useState<AsyncQueryState<T>>({
    data: undefined,
    isLoading: enabled,
    isError: false,
  });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const serializedKey = JSON.stringify(key);

  const refetch = useCallback(() => {
    if (!enabled) {
      setState({ data: undefined, isLoading: false, isError: false });
      return Promise.resolve();
    }
    setState((s) => ({ ...s, isLoading: true, isError: false }));
    return fetcherRef
      .current()
      .then((data) => setState({ data, isLoading: false, isError: false }))
      .catch(() => setState({ data: undefined, isLoading: false, isError: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, serializedKey]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}
