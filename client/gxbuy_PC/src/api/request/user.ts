import request from '../config';

export function userRegisterRequest(registerInfo: {
  user_account: string;
  user_name: string;
  user_password: string;
  code: string;
}) {
  return request({
    url: '/user/register',
    method: 'post',
    data: registerInfo,
    withCredentials: true,
  });
}

export function userLoginRequest(loginInfo: { user_account: string; user_password: string; code: string }) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginInfo,
    withCredentials: true,
  });
}

export function getUserInfoRequest() {
  return request({
    url: '/user/jwt/getUserInfo',
  });
}

export function getUserRecordRequest(options: {
  feature: 'favorite' | 'follow' | 'buyed_shop' | 'browse_history' | 'search_history' | string;
  pageSize: number;
  page: number;
}) {
  return request({
    url: '/user/jwt/getUserRecord',
    params: options,
  });
}

export function followRequest(shop_id: string) {
  return request({
    url: '/user/jwt/follow',
    method: 'post',
    data: { shop_id },
  });
}

export function favoriteRequest(goods_spu_id: string) {
  return request({
    url: '/user/jwt/favorite',
    method: 'post',
    data: { goods_spu_id },
  });
}

export function deleteSearchHistorySingleRequest(hid: string) {
  return request({
    url: '/user/jwt/deleteSearchHistorySingle/' + hid,
    method: 'delete',
  });
}

export function deleteSearchHistoryAllRequest() {
  return request({
    url: '/user/jwt/deleteSearchHistoryAll',
    method: 'delete',
  });
}

export function deleteBrowseHistorySingleRequest(hid: string) {
  return request({
    url: '/user/jwt/deleteBrowseHistorySingle/' + hid,
    method: 'delete',
  });
}

export function deleteBrowseHistoryAllRequest() {
  return request({
    url: '/user/jwt/deleteBrowseHistoryAll',
    method: 'delete',
  });
}
