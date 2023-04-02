import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import chalk from 'chalk';
import mime from 'mime-types';

const instance = axios.create({
  baseURL: '/arm',
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const token = '';
    if (token) {
      config.headers.Authorization = 'Bearer';
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    const contentType = response.headers['Content-Type'] as string;
    const ext = mime.extension(contentType);
    if (ext === 'json') {
      const data = response.data;
      if (!data.status) return Promise.reject(data.msg);
      return data;
    }
    return response;
  },
  (error) => {
    // console.dir(error);
    const response = error.response;
    if (response) {
      const { status, statusText } = response;
      return Promise.reject(`[${status}]: ${statusText}`);
    } else if (
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      error.message.includes('timeout')
    ) {
      return Promise.reject(error.message || '请求超时');
    }
    return Promise.reject(`[${error.code}]: ${error.message}`);
  }
);

export default instance;
