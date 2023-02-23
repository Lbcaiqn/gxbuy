import {AxiosResponse} from 'axios'
import instance from './request'

export function getBaseCategoryList(): Promise<AxiosResponse>{
  return instance({
    url: '/api/product/getBaseCategoryList'
  })
}