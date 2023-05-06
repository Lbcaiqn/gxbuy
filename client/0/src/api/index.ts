import {AxiosResponse} from 'axios'
import request from './request'
import mockRequest from './mockRequest'


export function getBaseCategoryList(): Promise<AxiosResponse>{
  return request({
    url: '/api/product/getBaseCategoryList'
  })
}

export function getHomeData(): Promise<AxiosResponse>{
  return mockRequest({
    url: '/HomeData'
  })
}