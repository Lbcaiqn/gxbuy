import request from '../config';

export function insertShopcartDataRequest(insertInfo: {
  goods_spu_id: string;
  goods_sku_id: string;
  shop_id: string;
  quantity?: number;
}) {
  return request({
    url: '/shopcart/jwt/insert',
    method: 'post',
    data: insertInfo,
  });
}

export function getShopcartDataRequest() {
  return request({
    url: '/shopcart/jwt/getShopcartData',
  });
}

export function updateSingleStateRequest(updateInfo: {
  command: 'quantity' | 'selected' | string;
  quantity?: number;
  goods_sku_id: string;
}) {
  return request({
    url: '/shopcart/jwt/updateSingleState',
    method: 'patch',
    data: updateInfo,
  });
}

export function updateAllSelectedRequest(updateInfo: {
  command: 'all' | 'shop' | string;
  selectedOrCancel: boolean;
  shop_id?: string;
}) {
  return request({
    url: '/shopcart/jwt/updateAllSelected',
    method: 'patch',
    data: updateInfo,
  });
}

export function deleteSingleRequest(goods_sku_id: string) {
  return request({
    url: '/shopcart/jwt/deleteSingle/' + goods_sku_id,
    method: 'delete',
  });
}

export function deleteAllRequest() {
  return request({
    url: '/shopcart/jwt/deleteAll',
    method: 'delete',
  });
}
