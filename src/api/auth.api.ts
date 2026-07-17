import axiosClient from './axiosClient';
import type { ApiEnvelope, User } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    axiosClient.post<ApiEnvelope<AuthResponse>>('/auth/register', payload).then((r) => r.data.data),

  login: (payload: LoginPayload) =>
    axiosClient.post<ApiEnvelope<AuthResponse>>('/auth/login', payload).then((r) => r.data.data),

  logout: () => axiosClient.post<ApiEnvelope<null>>('/auth/logout').then((r) => r.data.data),

  me: () => axiosClient.get<ApiEnvelope<User>>('/auth/me').then((r) => r.data.data),
};
