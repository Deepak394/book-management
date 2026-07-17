import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { favoriteApi } from '@/api/favorite.api';
import { useAuth } from './AuthContext';
import type { Favorite } from '@/types';

interface FavoritesContextValue {
  favorites: Favorite[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites(undefined);
      setIsError(false);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await favoriteApi.list();
      setFavorites(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, isError, refetch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used within FavoritesProvider');
  return ctx;
}
