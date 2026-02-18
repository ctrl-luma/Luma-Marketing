import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, type User, type LoginCredentials, type SignupData } from '@/lib/api';
import { redirectToVendorDashboard } from '@/lib/auth-handoff';

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
      } catch {
        // Silently handle - user will need to re-authenticate
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
      // Small delay to ensure tokens are saved
      setTimeout(() => {
        redirectToVendorDashboard();
      }, 100);
    } catch (error: unknown) {
      const err = error as { error?: string }
      setError(err.error || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.signup(data);
      setUser(response.user);
      // Small delay to ensure tokens are saved
      setTimeout(() => {
        redirectToVendorDashboard();
      }, 100);
    } catch (error: unknown) {
      const err = error as { error?: string }
      setError(err.error || 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      router.push('/');
    } catch {
      // Silently handle - user is already logged out locally
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