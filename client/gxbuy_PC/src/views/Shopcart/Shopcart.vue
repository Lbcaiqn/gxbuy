<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  getShopcartDataRequest,
  updateSingleStateRequest,
  updateAllSelectedRequest,
  deleteSingleRequest,
  deleteAllRequest,
} from '@/api';
import { throttle } from '@/tools/lodash';
import { myMessage } from '@/tools/message';
import Counter from '@/components/common/Counter.vue';

const router = useRouter();

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

const shopcart = reactive<any>({
  data: [],
});

// 初始化数据----------------------------------------------------------------------
async function getShopcartData() {
  try {
    shopcart.data = (await getShopcartDataRequest()).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}
getShopcartData();

// 统计总价,判断是否全选-------------------------------------------------------------
const totalPrice = computed(() => {
  let total = 0;

  for (let index in shopcart.data.data) {
    total += shopcart.data.data[index].goods
      .filter((g: any) => g.selected)
      .reduce((acc: number, g: any) => acc + g.quantity * g.goods_sku.goods_sku_price, 0);
  }

  return total;
});

const allIsSelected = computed(() => {
  let selectedOrCancel = true;
  for (const index in shopcart.data.data) {
    if (shopcart.data.data[index].goods.find((i: any) => !i.selected)) {
      selectedOrCancel = false;
      break;
    }
  }
  return selectedOrCancel;
});

function shopIsSelected(shopIndex: number) {
  return !shopcart.data.data[shopIndex].goods.find((i: any) => !i.selected);
}

// 修改数量和选中状态------------------------------------------------------------------------
// 修改数量
const countUpdate = throttle(async (count: number, goods_sku_id: string, shopIndex: number, goodsIndex: number) => {
  try {
    updateSingleStateRequest({ command: 'quantity', goods_sku_id, quantity: count });
    shopcart.data.data[shopIndex].goods[goodsIndex].quantity = count;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);

// 修改单个商品选中状态
const selectedUpdate = throttle(async (goods_sku_id: string, shopIndex: number, goodsIndex: number) => {
  try {
    updateSingleStateRequest({ command: 'selected', goods_sku_id });
    shopcart.data.data[shopIndex].goods[goodsIndex].selected =
      !shopcart.data.data[shopIndex].goods[goodsIndex].selected;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);

// 修改单个商家的所有商品选中状态
const selectedShopUpdate = throttle(async (shop_id: string, shopIndex: number) => {
  const selectedOrCancel = !shopIsSelected(shopIndex);

  try {
    updateAllSelectedRequest({ command: 'shop', selectedOrCancel: selectedOrCancel, shop_id });
    for (const i of shopcart.data.data[shopIndex].goods) i.selected = selectedOrCancel;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);

// 全选
const selectedAllUpdate = throttle(async () => {
  const selectedOrCancel = !allIsSelected.value;

  try {
    updateAllSelectedRequest({ command: 'all', selectedOrCancel: selectedOrCancel });

    for (let index in shopcart.data.data) {
      for (let g of shopcart.data.data[index].goods) g.selected = selectedOrCancel;
    }
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);

// 删除数据---------------------------------------------------------------------
// 删除单个
async function deleteSingle(shopIndex: number, goodsIndex: number) {
  const goods_sku_id = shopcart.data.data[shopIndex].goods[goodsIndex].goods_sku._id;

  try {
    await deleteSingleRequest(goods_sku_id);

    shopcart.data.data[shopIndex].goods.splice(goodsIndex, 1);
    if (shopcart.data.data[shopIndex].goods.length === 0) shopcart.data.data.splice(shopIndex, 1);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

// 清空购物车
async function deleteAll() {
  try {
    await deleteAllRequest();
    shopcart.data = {};
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

// 结算
function buy() {
  const isSelectedGoods = shopcart.data.data.reduce((ids: string[], shop: any) => {
    return [...ids, ...shop.goods.filter((scItem: any) => scItem.selected).map((scItem: any) => scItem._id)];
  }, []);

  if (isSelectedGoods.length === 0) return;

  router.push({
    path: '/confirmOrder',
    query: {
      fromShopcart: isSelectedGoods,
    },
  });
}
</script>

<template>
  <div id="shopcart">
    <div class="pc-center" v-if="shopcart.data.length !== 0">
      <div class="shopcart-header-footer">
        <div class="left">{{ `购物车（全部 ${shopcart.data.total}）` }}</div>
        <div class="right">
          <div>
            总价：
            <span style="font-size: 25px; font-weight: fold; color: red"> ￥{{ totalPrice.toFixed(2) }} </span>
          </div>
          <div class="btn" @click="buy">结算</div>
        </div>
      </div>
      <div class="shopcart-container">
        <div class="shopcart-title">
          <div class="selected">
            <div @click="selectedAllUpdate">
              <div class="selected-box" :class="{ 'selected-box-active': allIsSelected }">
                {{ allIsSelected ? '√' : '' }}
              </div>
              <div>全选</div>
            </div>
          </div>
          <div class="goods-spu">商品信息</div>
          <div class="goods-sku">分类</div>
          <div class="price">单价</div>
          <div class="count">数量</div>
          <div class="total-price">总价</div>
          <div class="operate">操作</div>
        </div>

        <div class="shopcart-shop" v-for="(shop, shopIndex) in shopcart.data.data" :key="shopIndex">
          <div class="shopcart-shopinfo">
            <div class="shop-selected">
              <div
                class="selected-box"
                :class="{ 'selected-box-active': shopIsSelected(shopIndex) }"
                @click="selectedShopUpdate(shop.shop._id, shopIndex)"
              >
                {{ shopIsSelected(shopIndex) ? '√' : '' }}
              </div>
            </div>
            <div class="shop-info">
              <div class="shop-logo">
                <el-image :src="baseURL + shop.shop.shop_logo" lazy />
              </div>
              <div class="shop-name">{{ shop.shop.shop_name }}</div>
            </div>
          </div>
          <div class="shopcart-shop-goods" v-for="(goods, goodsIndex) in shop.goods" :key="goods._id">
            <div class="selected">
              <div
                class="selected-box"
                :class="{ 'selected-box-active': goods.selected }"
                @click="selectedUpdate(goods.goods_sku._id, shopIndex, goodsIndex)"
              >
                {{ goods.selected ? '√' : '' }}
              </div>
            </div>
            <div class="goods-spu" @click="$router.push('/goods' + goods.goods_spu._id)">
              <div>
                <el-image :src="goods.goods_sku.goods_sku_img" lazy />
              </div>
              <div>{{ goods.goods_spu.goods_spu_name }}</div>
            </div>
            <div class="goods-sku">
              <div v-for="(attrs, attrsIndex) in goods.goods_sku.sku_sales_attrs" :key="attrsIndex">
                {{ attrs.name }}：{{ attrs.value }}
              </div>
            </div>
            <div class="price">￥{{ goods.goods_sku.goods_sku_price }}</div>
            <div class="count">
              <Counter
                :count="goods.quantity"
                @countUpdate="countUpdate($event, goods.goods_sku._id, shopIndex, goodsIndex)"
              />
            </div>
            <div class="total-price">￥{{ (goods.quantity * Number(goods.goods_sku.goods_sku_price)).toFixed(2) }}</div>
            <div class="operate" @click="deleteSingle(shopIndex, goodsIndex)">删除</div>
          </div>
        </div>

        <div class="shopcart-header-footer">
          <div class="left">
            <div class="btn" @click="deleteAll">清空购物车</div>
          </div>
          <div class="right">
            <div>
              总价：
              <span style="font-size: 25px; font-weight: fold; color: red"> ￥{{ totalPrice.toFixed(2) }} </span>
            </div>
            <div class="btn" @click="buy">结算</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#shopcart {
  margin-top: 20px;
  .selected-box {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    border: 2px solid #000;
  }

  .selected-box-active {
    color: #fff;
    background-color: red;
    border: 1px solid red;
  }

  .pc-center {
    width: 1350px;
    padding: 25px;
    border: 3px solid @main-color;
    border-radius: 30px;

    .shopcart-header-footer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      height: 50px;

      .btn {
        width: 180px;
        height: 50px;
        line-height: 45px;
        text-align: center;
        font-size: 25px;
        cursor: pointer;
        color: #fff;
        background-color: @main-color;
        border: 1px solid @main-color;
        border-radius: 10px;
      }

      .left {
        height: 50px;
        line-height: 45px;
        font-size: 25px;
      }

      .right {
        display: flex;
        align-items: center;
        height: 50px;

        .btn {
          margin-left: 50px;
        }

        > div {
          height: 50px;
          line-height: 50px;
          font-size: 25px;
        }
      }
    }

    .shopcart-container {
      .shopcart-title {
        display: flex;

        > div {
          padding: 15px;
          height: 60px;
          line-height: 30px;
          text-align: center;
          border: 3px solid @main-color;
          border-right: 0;
        }

        .selected {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10%;

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            > div:first-child {
              margin-right: 10px;
            }

            > div:nth-child(2) {
              font-size: 20px;
              height: 25px;
              line-height: 25px;
            }
          }
        }

        .goods-spu {
          width: 30%;
        }

        .goods-sku {
          width: 15%;
        }

        .price {
          width: 10%;
        }

        .count {
          width: 15%;
        }

        .total-price {
          width: 10%;
        }

        .operate {
          width: 10%;
          border-right: 3px solid @main-color;
        }
      }
      .shopcart-shop {
        margin: 50px 0;
        border: 3px solid @main-color;
        border-radius: 20px;

        .shopcart-shopinfo {
          display: flex;
          height: 50px;

          .shop-selected {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10%;
          }

          .shop-info {
            display: flex;
            align-items: center;

            > div:first-child {
              margin: 0 10px;
              width: 30px;
              height: 30px;

              :deep(img) {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }

            > div:nth-child(2) {
              font-size: 20px;
            }
          }
        }

        .shopcart-shop-goods {
          display: flex;

          > div {
            padding: 15px;
            padding-top: 10px;
            border-top: 3px solid @main-color;
            border-right: 3px solid @main-color;
          }
          .selected {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10%;
            border-radius: 0 0 0 10px;
          }

          .goods-spu {
            display: flex;
            width: 30%;
            cursor: pointer;

            > div:first-child {
              margin-top: 5px;
              margin-right: 15px;
              width: 120px;
              height: 120px;

              :deep(img) {
                width: 100%;
                height: 100%;
              }
            }

            > div:nth-child(2) {
              width: 195px;
              height: 58px;
              font-size: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          .goods-sku {
            width: 15%;

            > div {
              margin-bottom: 5px;
            }
          }

          .price {
            width: 10%;
            font-weight: bold;
            color: red;
          }

          .count {
            width: 15%;
          }

          .total-price {
            width: 10%;
            font-weight: bold;
            color: red;
          }

          .operate {
            width: 10%;
            border-right: 0;
            border-radius: 0 0 10px 0;
          }
        }
      }
    }
  }
}
</style>
