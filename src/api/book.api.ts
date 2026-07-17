import axiosClient from './axiosClient';
import type { ApiEnvelope, Book, Category, Pagination } from '@/types';

export interface BookListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export interface BookListResult {
  items: Book[];
  pagination: Pagination;
}

export interface BookFormPayload {
  title: string;
  author: string;
  description?: string;
  isbn: string;
  price: number;
  categoryId: string;
  publishDate: string;
  image?: FileList | null;
}

function toFormData(payload: BookFormPayload) {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('author', payload.author);
  formData.append('description', payload.description || '');
  formData.append('isbn', payload.isbn);
  formData.append('price', String(payload.price));
  formData.append('categoryId', payload.categoryId);
  formData.append('publishDate', payload.publishDate);
  if (payload.image && payload.image.length > 0) {
    formData.append('image', payload.image[0]);
  }
  return formData;
}

export const bookApi = {
  list: (params: BookListParams) =>
    axiosClient.get<ApiEnvelope<Book[]>>('/books', { params }).then((r) => ({
      items: r.data.data,
      pagination: r.data.meta as Pagination,
    })),

  getById: (id: string) =>
    axiosClient
      .get<ApiEnvelope<{ book: Book; breadcrumb: Category[] }>>(`/books/${id}`)
      .then((r) => r.data.data),

  create: (payload: BookFormPayload) =>
    axiosClient
      .post<ApiEnvelope<Book>>('/books', toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data.data),

  update: (id: string, payload: BookFormPayload) =>
    axiosClient
      .put<ApiEnvelope<Book>>(`/books/${id}`, toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data.data),

  remove: (id: string) => axiosClient.delete<ApiEnvelope<null>>(`/books/${id}`).then((r) => r.data.data),
};
