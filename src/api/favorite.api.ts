import axiosClient from './axiosClient';
import type { ApiEnvelope, Favorite } from '@/types';

export const favoriteApi = {
  list: () => axiosClient.get<ApiEnvelope<Favorite[]>>('/favorites').then((r) => r.data.data),

  add: (bookId: string) =>
    axiosClient.post<ApiEnvelope<null>>(`/favorites/${bookId}`).then((r) => r.data.data),

  remove: (bookId: string) =>
    axiosClient.delete<ApiEnvelope<null>>(`/favorites/${bookId}`).then((r) => r.data.data),
};
