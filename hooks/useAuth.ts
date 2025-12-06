import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, type User, type LoginCredentials, type SignupData } from '@/lib/api';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = authService.getUser();
        setUser(savedUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard';
    } catch (error: any) {
      setError(error.error || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.signup(data);
      setUser(response.user);
      window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard';
    } catch (error: any) {
      setError(error.error || 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    error,
  };
}