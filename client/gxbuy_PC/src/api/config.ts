import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import router from '@/router';

const cancelTokenSource = axios.CancelToken.source();

let instance: AxiosInstance = axios.create({
  baseURL:
    (import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL) +
    '/v1/',
  timeout: 1000 * 10,
});

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const userInfo = JSON.parse((localStorage.getItem('gxbuy_PC_user_store') as string) || 'null');
  const jwt = userInfo?.gxbuy_PC_jwt;

  // 后端需要jwt鉴权的接口，url都会有'/jwt/'，所以遇到有 '/jwt/' 的借口就加上请求头
  if (/\/jwt\//.test(config.url as string)) {
    // 如果未登录，就取消此次请求，并跳转登录页
    if (!jwt) {
      // 这里兜底一下，确保此时router却是已经挂在完毕
      await router.isReady();
      cancelTokenSource.cancel();
      router.push({
        path: '/login',
        query: { toPath: router.currentRoute.value.fullPath },
      });

      // 拦截器必须returen，所以这里return一个异常，请求时catch就好
      return Promise.reject(new Error('未登录'));
    } else {
      config.headers!.authorization = jwt;
    }
  }
  // 如果是登录状态，那么搜索和浏览商品时也携带token，让后端记录搜索记录和浏览记录
  else if (
    jwt &&
    (/\/goods\/search/.test(config.url as string) ||
      /\/goods\/detail/.test(config.url as string) ||
      /\/shop\/getShopInfo/.test(config.url as string))
  ) {
    config.headers!.authorization = jwt;
  }

  return config;
});

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  async (err: AxiosError) => {
    // 如果jwt验证失败或者jwt过期，后端一般是返回403
    if ((err.response?.data as any)?.status === 403) {
      console.log(localStorage.setItem('gxbuy_PC_user_store', ''));

      await router.isReady();
      cancelTokenSource.cancel();

      // 如果首页会发送需要鉴权的请求，嘛呢过期了就不及自动今日登录界面，不认用户体验性不好，用户自己重新点击登录
      if (router.currentRoute.value.name !== 'home') {
        router.push({
          path: '/login',
          query: { toPath: router.currentRoute.value.fullPath },
        });
      }

      return Promise.reject(new Error('请重新登录'));
    }

    return Promise.reject(err);
  }
);

export default instance;
