import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { authApi, type LoginPayload, type RegisterPayload } from '@/api/auth.api';
import type { User } from '@/types';
import { getErrorMessage } from '@/lib/utils';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (payload: LoginPayload) => {
    const result = await authApi.login(payload);
    localStorage.setItem('token', result.token);
    setUser(result.user);
  };

  const register = async (payload: RegisterPayload) => {
    const result = await authApi.register(payload);
    localStorage.setItem('token', result.token);
    setUser(result.user);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
