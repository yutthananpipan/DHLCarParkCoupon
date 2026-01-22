/**
 * API Configuration
 * Handles API base URL based on environment
 */

const getApiUrl = (): string => {
  // Priority: VITE_API_URL from .env > default based on environment
  const envApiUrl = import.meta.env.VITE_API_URL;

  if (envApiUrl) {
    return envApiUrl;
  }

  // In production, API is served from same origin (via reverse proxy)
  if (import.meta.env.PROD) {
    return globalThis.location.origin;
  }

  // Development fallback
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiUrl();

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  AUTH: {
    LOGIN: '/api/auth/login',
  },
  PRINTER: {
    STATUS: '/api/printer/status',
    PRINT: '/api/printer/print',
  },
} as const;

/**
 * Build full API URL
 */
export const getApiEndpoint = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Fetch wrapper with error handling
 */
export const apiFetch = async <T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const url = getApiEndpoint(endpoint);

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
