import toast from 'react-hot-toast';
import { categoryApi, type CategoryPayload } from '@/api/category.api';
import { useAsyncQuery } from './useAsyncQuery';
import { useAsyncAction } from './useAsyncAction';
import { getErrorMessage } from '@/lib/utils';

export function useCategoryTree() {
  return useAsyncQuery(categoryApi.tree, 'tree');
}

export function useCategoriesFlat() {
  return useAsyncQuery(categoryApi.flat, 'flat');
}

export function useCreateCategory() {
  const { mutate: run, isPending } = useAsyncAction((payload: CategoryPayload) => categoryApi.create(payload));
  const mutate = (payload: CategoryPayload, options?: { onSuccess?: () => void }) =>
    run(payload, {
      onSuccess: () => {
        toast.success('Category created');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}

export function useUpdateCategory() {
  const { mutate: run, isPending } = useAsyncAction(
    ({ id, payload }: { id: string; payload: CategoryPayload }) => categoryApi.update(id, payload)
  );
  const mutate = (args: { id: string; payload: CategoryPayload }, options?: { onSuccess?: () => void }) =>
    run(args, {
      onSuccess: () => {
        toast.success('Category updated');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}

export function useDeleteCategory() {
  const { mutate: run, isPending } = useAsyncAction((id: string) => categoryApi.remove(id));
  const mutate = (id: string, options?: { onSuccess?: () => void }) =>
    run(id, {
      onSuccess: () => {
        toast.success('Category deleted');
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  return { mutate, isPending };
}
