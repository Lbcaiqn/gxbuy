import axios,{AxiosInstance,InternalAxiosRequestConfig,AxiosResponse} from 'axios'

let instance: AxiosInstance = axios.create({
  baseURL: '/mock',
  timeout: 1000 * 5
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})
instance.interceptors.response.use((res: AxiosResponse) => {
  return res
})

export default instance