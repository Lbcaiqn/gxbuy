import Mock from 'mockjs'
import HomeData from './HomeData.json'

Mock.mock("/mock/HomeData", { code: 200, data: HomeData });