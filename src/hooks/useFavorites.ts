import toast from 'react-hot-toast';
import { favoriteApi } from '@/api/favorite.api';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { useAsyncAction } from './useAsyncAction';
import { getErrorMessage } from '@/lib/utils';

export function useFavorites() {
  const { favorites, isLoading, isError, refetch } = useFavoritesContext();
  return { data: favorites, isLoading, isError, refetch };
}

export function useIsFavorite(bookId: string) {
  const { favorites } = useFavoritesContext();
  return !!favorites?.some((f) => f.book._id === bookId);
}

export function useToggleFavorite() {
  const { refetch } = useFavoritesContext();
  const { mutate: run, isPending } = useAsyncAction(
    ({ bookId, isFavorite }: { bookId: string; isFavorite: boolean }) =>
      isFavorite ? favoriteApi.remove(bookId) : favoriteApi.add(bookId)
  );

  const mutate = (
    args: { bookId: string; isFavorite: boolean },
    options?: { onSuccess?: () => void }
  ) =>
    run(args, {
      onSuccess: async () => {
        toast.success(args.isFavorite ? 'Removed from favorites' : 'Added to favorites');
        await refetch();
        options?.onSuccess?.();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });

  return { mutate, isPending };
}
