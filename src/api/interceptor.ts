import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    return response;
  },
  (error) => {
    const errorCode = error.response.status;

    if (errorCode !== 200) {
      Message.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
