import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

let instance: AxiosInstance = axios.create({
  baseURL:
    (import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL) +
    '/v1/',
  timeout: 1000 * 10,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});
instance.interceptors.response.use((res: AxiosResponse) => {
  return res;
});

export default instance;
