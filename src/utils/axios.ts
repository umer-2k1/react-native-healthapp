import axios, {AxiosInstance} from 'axios';
import {STORAGE_ENUMS} from './constants';
import {getItem, setItem} from './storage';
import {logoutHandler} from './logoutHandler';

// Types
interface ErrorResponse {
  success: boolean;
  message: string;
}

// Function to refresh access token (sets refresh token in headers)
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = await getItem(STORAGE_ENUMS.REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post<{data: {access_token: string}}>(
      `${process.env.BASE_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response.data.data.access_token) {
      setItem(STORAGE_ENUMS.ACCESS_TOKEN, response.data.data.access_token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
};

// Create and configure axios instance
// const BASE = 'http://localhost:8000/api/v1';
const BASE = 'https://decima-dev-cwb2bkgwgsc3edhw.z03.azurefd.net/api/v1';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE || process.env.BASE_URL,
  timeout: Number(process.env.API_TIMEOUT) || 40000,
});

// Build headers function
const buildHttpHeader = async (
  multipart: boolean = false,
): Promise<Record<string, string>> => {
  const token = getItem<string>(STORAGE_ENUMS.ACCESS_TOKEN);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (!multipart) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

// Axios interceptors

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Ensure retry flag is set

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        originalRequest.headers.Authorization = `Bearer ${getItem(
          STORAGE_ENUMS.ACCESS_TOKEN,
        )}`;
        return axiosInstance(originalRequest);
      } else {
        await logoutHandler('Session expired. Please log in again.');
      }
    }
    return Promise.reject(error);
  },
);

// HTTP methods
const http = {
  get: async <T>(url: string): Promise<T | ErrorResponse> => {
    try {
      const headers = await buildHttpHeader();
      const response = await axiosInstance.get<T>(url, {headers});
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unknown error occurred',
      };
    }
  },

  post: async <T>(
    url: string,
    payload: Record<string, any>,
    multipart: boolean = false,
  ): Promise<T | ErrorResponse> => {
    try {
      const headers = await buildHttpHeader(multipart);
      const body = multipart ? payload : JSON.stringify(payload);
      const response = await axiosInstance.post<T>(url, body, {headers});

      return response.data;
    } catch (error: any) {
      console.error('Errr', error);

      return {
        success: false,
        message: error.response?.data?.message || 'Unknown error occurred',
      };
    }
  },

  put: async <T>(
    url: string,
    payload: Record<string, any>,
    multipart: boolean = false,
  ): Promise<T | ErrorResponse> => {
    try {
      const headers = await buildHttpHeader(multipart);
      const body = multipart ? payload : JSON.stringify(payload);
      const response = await axiosInstance.put<T>(url, body, {headers});

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unknown error occurred',
      };
    }
  },

  patch: async <T>(
    url: string,
    payload: Record<string, any>,
    multipart: boolean = false,
  ): Promise<T | ErrorResponse> => {
    try {
      const headers = await buildHttpHeader(multipart);
      const body = multipart ? payload : JSON.stringify(payload);
      const response = await axiosInstance.patch<T>(url, body, {headers});
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unknown error occurred',
      };
    }
  },

  destroy: async <T>(
    url: string,
    payload?: Record<string, any>,
  ): Promise<T | ErrorResponse> => {
    try {
      const headers = await buildHttpHeader();
      const response = await axiosInstance.delete<T>(url, {
        headers,
        data: payload,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unknown error occurred',
      };
    }
  },

  download: async (url: string): Promise<void> => {
    try {
      const headers = await buildHttpHeader();
      await axiosInstance.get(url, {
        headers,
        responseType: 'blob',
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Download failed');
    }
  },
};

export {http};
