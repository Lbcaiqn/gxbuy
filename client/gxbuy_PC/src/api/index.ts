import request from './request';

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

export function getSearchRequest(options: {
  keyword?: string;
  c1id?: number;
  c2id?: number;
  c3id?: number;
  pageSize?: number;
  page?: number;
}) {
  return request({
    url: '/goods/search',
    params: {
      keyword: options.keyword,
      c1id: options.c1id,
      c2id: options.c2id,
      c3id: options.c3id,
      pageSize: options.pageSize,
      page: options.page,
    },
  });
}

export function getGoodsByShopRequest(id: string, options: { pageSize?: number; page?: number }) {
  return request({
    url: '/goods/getGoodsByShop/' + id,
    params: {
      pageSize: options.pageSize,
      page: options.page,
    },
  });
}

export function getGoodsDetailDataRequest(id: string) {
  return request({
    url: '/goods/detail/' + id,
  });
}

export function getGoodsCommentRequest(id: string, options: { pageSize?: number; page?: number }) {
  return request({
    url: '/goods/getGoodsComment/' + id,
    params: {
      pageSize: options.pageSize,
      page: options.page,
    },
  });
}

export function getShopInfoDataRequest(id: string) {
  return request({
    url: '/shop/getShopInfo/' + id,
  });
}
