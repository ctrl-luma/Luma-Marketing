type ApiError = {
  error: string;
  statusCode?: number;
  details?: unknown;
};

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        error: 'Request failed',
        statusCode: response.status,
      };

      try {
        const data = await response.json();
        error.error = data.error || data.message || 'Request failed';
        error.details = data;
      } catch {
        error.error = `Request failed with status ${response.status}`;
      }

      throw error;
    }

    try {
      return await response.json();
    } catch {
      return {} as T;
    }
  }

  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers: Record<string, string> = {
      ...this.defaultHeaders as Record<string, string>,
      ...customHeaders as Record<string, string>,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: this.getHeaders(options?.headers),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    console.log('API POST:', `${this.baseURL}${endpoint}`, data);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    console.log('API Response status:', response.status);

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers: this.getHeaders(options?.headers),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'PATCH',
      headers: this.getHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
export type { ApiError };