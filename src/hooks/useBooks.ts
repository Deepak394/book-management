import toast from 'react-hot-toast';
import { bookApi, type BookFormPayload, type BookListParams } from '@/api/book.api';
import { useAsyncQuery } from './useAsyncQuery';
import { useAsyncAction } from './useAsyncAction';
import { getErrorMessage } from '@/lib/utils';

export function useBooks(params: BookListParams) {
  return useAsyncQuery(() => bookApi.list(params), params);
}

export function useBook(id: string | undefined) {
  return useAsyncQuery(() => bookApi.getById(id as string), id, !!id);
}

export function useCreateBook() {
  const { mutate: run, isPending } = useAsyncAction((payload: BookFormPayload) => bookApi.create(payload));
  const mutate = (payload: BookFormPayload, options?: { onSuccess?: () => void }) =>
    run(payload, {
      onSuccess: () => {
        toast.success('Book created successfully');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}

export function useUpdateBook() {
  const { mutate: run, isPending } = useAsyncAction(
    ({ id, payload }: { id: string; payload: BookFormPayload }) => bookApi.update(id, payload)
  );
  const mutate = (args: { id: string; payload: BookFormPayload }, options?: { onSuccess?: () => void }) =>
    run(args, {
      onSuccess: () => {
        toast.success('Book updated successfully');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}

export function useDeleteBook() {
  const { mutate: run, isPending } = useAsyncAction((id: string) => bookApi.remove(id));
  const mutate = (id: string, options?: { onSuccess?: () => void }) =>
    run(id, {
      onSuccess: () => {
        toast.success('Book deleted successfully');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}
