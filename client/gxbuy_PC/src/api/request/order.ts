import request from '../config';

export function getOrderDataRequest(options: {
  feature: 'all' | 'wait_paid' | 'wait_shipped' | 'wait_receive' | 'wait_comment' | string;
  pageSize: number;
  page: number;
}) {
  return request({
    url: '/order/jwt/getOrderData',
    params: options,
  });
}

export function getConfirmOrderDataRequest(options: { from: 'goods' | 'shopcart' | string; goodsSkuId?: string }) {
  return request({
    url: '/order/jwt/getConfirmOrderData',
    params: options,
  });
}

export function createOrderByIdRequest(options: { goodsSkuId: string; shopId: string; quantity: number }) {
  return request({
    url: '/order/jwt/createOrderById',
    method: 'post',
    data: options,
  });
}

export function createOrderByShopcartRequest(shopcartIds: Array<string>) {
  return request({
    url: '/order/jwt/createOrderByShopcart',
    method: 'post',
    data: {
      shopcartIds,
    },
  });
}

export function getPayInfoRequest(orderIds: Array<string>) {
  return request({
    url: '/order/jwt/getPayInfo',
    params: {
      orderIds,
    },
  });
}

export function getPayStateRequest(orderIds: Array<string>) {
  return request({
    url: '/order/jwt/getPayState',
    params: {
      orderIds,
    },
  });
}

export function completePayRequest(orderIds: Array<string>) {
  return request({
    url: '/order/jwt/completePay',
    method: 'patch',
    data: {
      orderIds,
    },
  });
}

export function cancelOrderRequest(orderIds: Array<string>) {
  return request({
    url: '/order/jwt/cancelOrder',
    method: 'patch',
    data: {
      orderIds,
    },
  });
}
