import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import chalk from 'chalk';

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
    const res = response.data;
    if (!res?.status) {
      return Promise.reject(res.msg);
    }
    return res;
  },
  (error) => {
    console.dir(error);
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    const response = error.response;
    const configUrl = response?.config?.url;
    if (response && !configUrl.match('/user/login')) {
      const { status, statusText } = response;
      switch (status) {
        case 404:
          console.error('请求接口404');
          break;
        default:
          console.error(statusText || '出错了');
          break;
      }
    } else if (
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      error.message.includes('timeout')
    ) {
      console.error('请求超时');
      return Promise.reject(error.message);
    }
    return Promise.reject(error.response.data?.msg);
  }
);

export default instance;
