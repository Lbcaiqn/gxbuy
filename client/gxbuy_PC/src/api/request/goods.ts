import request from '../config';

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
