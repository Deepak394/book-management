import { useCallback, useRef, useState } from 'react';

interface ActionOptions<TResult> {
  onSuccess?: (result: TResult) => void;
  onError?: (err: unknown) => void;
}

export function useAsyncAction<TArgs, TResult>(action: (args: TArgs) => Promise<TResult>) {
  const [isPending, setIsPending] = useState(false);
  const actionRef = useRef(action);
  actionRef.current = action;

  const mutate = useCallback((args: TArgs, options?: ActionOptions<TResult>) => {
    setIsPending(true);
    actionRef
      .current(args)
      .then((result) => options?.onSuccess?.(result))
      .catch((err) => options?.onError?.(err))
      .finally(() => setIsPending(false));
  }, []);

  return { mutate, isPending };
}
