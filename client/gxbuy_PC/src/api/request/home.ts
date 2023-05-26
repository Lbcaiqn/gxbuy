import request from '../config';

export function getCategoryDataRequest() {
  return request({
    url: '/category/getCategoryData',
  });
}

export function getBannerDataRequest() {
  return request({
    url: '/home/getBannerData/PC',
  });
}

export function getRecommendDataRequest() {
  return request({
    url: '/home/getRecommendData',
  });
}

export function getGoodsByFeatureRequest(feature: 'hot' | 'new' | 'pop', pageSize: number, page: number) {
  return request({
    url: '/goods/getGoodsByFeature',
    params: {
      feature,
      pageSize,
      page,
    },
  });
}

export function getFloorDataRequest() {
  return request({
    url: '/home/getFloorData',
  });
}
