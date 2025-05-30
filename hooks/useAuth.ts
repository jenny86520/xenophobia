import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/auth.service';
import { LoginCredentials, RegisterData, User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 初始化時檢查用戶是否已登錄
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          const storedUser = authService.getUser();
          if (storedUser) {
            // 從API獲取最新的用戶信息
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          }
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setError(err.message || '認證初始化失敗');
        // 清除無效的認證信息
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 登錄
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await authService.login(credentials);
      setUser(user);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || '登錄失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // 註冊
  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.register(data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || '註冊失敗';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // 登出
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    router.push('/login');
  }, [router]);

  // 更新用戶信息
  const updateUserInfo = useCallback((newUserInfo: User) => {
    setUser(newUserInfo);
    // 更新本地存儲的用戶信息
    localStorage.setItem('user', JSON.stringify(newUserInfo));
  }, []);

  // 更新用戶點數
  const updateUserPoints = useCallback((newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
      // 更新本地存儲的用戶信息
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUserInfo,
    updateUserPoints
  };
};
