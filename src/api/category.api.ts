import axiosClient from './axiosClient';
import type { ApiEnvelope, Category, CategoryNode } from '@/types';

export interface CategoryPayload {
  name: string;
  parentId?: string | null;
}

export const categoryApi = {
  tree: () => axiosClient.get<ApiEnvelope<CategoryNode[]>>('/categories').then((r) => r.data.data),

  flat: () =>
    axiosClient
      .get<ApiEnvelope<Category[]>>('/categories', { params: { format: 'flat' } })
      .then((r) => r.data.data),

  getById: (id: string) =>
    axiosClient.get<ApiEnvelope<Category>>(`/categories/${id}`).then((r) => r.data.data),

  create: (payload: CategoryPayload) =>
    axiosClient.post<ApiEnvelope<Category>>('/categories', payload).then((r) => r.data.data),

  update: (id: string, payload: CategoryPayload) =>
    axiosClient.put<ApiEnvelope<Category>>(`/categories/${id}`, payload).then((r) => r.data.data),

  remove: (id: string) =>
    axiosClient.delete<ApiEnvelope<null>>(`/categories/${id}`).then((r) => r.data.data),
};
