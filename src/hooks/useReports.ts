import { reportApi } from '@/api/report.api';
import { useAsyncQuery } from './useAsyncQuery';

export function useDashboardStats() {
  return useAsyncQuery(reportApi.dashboard, 'dashboard');
}

export function useFavoritesReport() {
  return useAsyncQuery(reportApi.favorites, 'favorites-report');
}
