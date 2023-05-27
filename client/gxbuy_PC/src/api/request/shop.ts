import request from '../config';

export function getShopInfoDataRequest(shopId: string) {
  return request({
    url: '/shop/getShopInfo/' + shopId,
  });
}
