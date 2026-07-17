import axiosClient from './axiosClient';
import type { ApiEnvelope, DashboardStats, FavoritesReport } from '@/types';

export const reportApi = {
  dashboard: () =>
    axiosClient.get<ApiEnvelope<DashboardStats>>('/reports/dashboard').then((r) => r.data.data),

  favorites: () =>
    axiosClient.get<ApiEnvelope<FavoritesReport>>('/reports/favorites').then((r) => r.data.data),
};
