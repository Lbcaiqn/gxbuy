<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getConfirmOrderDataRequest, createOrderByIdRequest, createOrderByShopcartRequest } from '@/api';
import { myMessage } from '@/tools/message';

const route = useRoute();
const router = useRouter();

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

// 初始化数据--------------------------------------------------------------------
const goods = reactive<any>({
  data: [],
});

async function getConfirmOrderData() {
  const options = route.query.fromGoods
    ? { from: 'goods', goodsSkuId: route.query.fromGoods as string }
    : route.query.fromShopcart
    ? { from: 'shopcart' }
    : null;

  if (!options) return;

  try {
    goods.data = (await getConfirmOrderDataRequest(options)).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }

  if (route.query.fromGoods) goods.data[0].goods[0].quantity = route.query.quantity;
}
getConfirmOrderData();

// 总价格------------------------------------------------------------------------------
const totalPrice = computed(() => {
  // return goods.data[0].goods[0].goods_sku.goods_sku_price;
  return (
    goods.data.reduce((sum: Number, item: any) => {
      return (sum +=
        item.goods.reduce((subSum: number, subItem: any) => {
          return (subSum += Number(subItem.goods_sku.goods_sku_price) * subItem.quantity);
        }, 0) || 0);
    }, 0) || 0
  ).toFixed(2);
});

// 支付------------------------------------------------------------------------------
const isPaying = ref<boolean>(false);
async function pay() {
  isPaying.value = true;

  if (route.query.fromGoods) {
    try {
      const orderId = (
        await createOrderByIdRequest({
          goodsSkuId: route.query.fromGoods as string,
          quantity: Number(route.query.quantity),
          shopId: goods.data[0].shop._id,
        })
      ).data;

      router.push({
        path: '/pay',
        query: { orderIds: [orderId] },
      });
    } catch (err: any) {
      myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
      isPaying.value = false;
    }
  } else if (route.query.fromShopcart) {
    try {
      if (typeof route.query.fromShopcart === 'string') route.query.fromShopcart = [route.query.fromShopcart];

      const orderIds = (await createOrderByShopcartRequest(route.query.fromShopcart as Array<string>)).data;

      router.push({
        path: '/pay',
        query: { orderIds },
      });
    } catch (err: any) {
      myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
      isPaying.value = false;
    }
  }
}
</script>

<template>
  <div id="confirm-order" class="pc-center" v-if="goods.data.length !== 0">
    <div class="title">收货地址</div>
    <div class="address">
      <div>张三</div>
      <div>18316332148</div>
      <div>广东省深圳市南山区</div>
    </div>

    <div class="title">商品信息</div>
    <div class="goods-info">
      <div class="goods-info-item" v-for="(s, sIndex) in goods.data" :key="sIndex">
        <div class="shop">
          <div>
            <el-image :src="baseURL + s.shop.shop_logo" lazy />
          </div>
          <div>{{ s.shop.shop_name }}</div>
        </div>
        <div class="goods" v-for="(g, gIndex) in s.goods" :key="gIndex">
          <div class="spu">
            <div>
              <el-image :src="g.goods_sku.goods_sku_img" lazy />
            </div>
            <div>{{ g.goods_spu.goods_spu_name }}</div>
          </div>
          <div class="sku">
            {{
              g.goods_sku.sku_sales_attrs.reduce(
                (str: string, item: any) => (str += item.name + ': ' + item.value + ' '),
                ''
              )
            }}
          </div>
          <div class="price">￥{{ g.goods_sku.goods_sku_price }}</div>
          <div class="count">{{ g.quantity }}</div>
        </div>
        <div class="notes">
          <textarea placeholder="订单备注"></textarea>
        </div>
      </div>
    </div>

    <div class="total">
      <div class="total-price">
        <span>合计：</span>
        <span style="color: red; font-weight: fold">￥{{ totalPrice }}</span>
      </div>

      <el-button class="total-btn" v-show="!isPaying" color="rgb(255,0,54)" round @click="pay">
        <template #default>
          <span class="el-btn-text">去支付</span>
        </template>
      </el-button>

      <el-button class="total-btn" v-show="isPaying" color="rgb(255,0,54)" loading round>
        <template #default>
          <span class="el-btn-text">请稍等</span>
        </template>
      </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#confirm-order {
  margin: 50px auto;
  padding: 0 20px;
  width: 1000px;
  border: 3px solid @main-color;
  border-radius: 20px;
  .title {
    padding: 20px 0;
    margin: 10px 0;
    height: 80px;
    line-height: 40px;
    font-size: 30px;
    border-bottom: 2px solid @main-color;
  }
  .address {
    display: flex;
    padding: 20px 0;
    border-bottom: 2px solid @main-color;

    > div {
      margin-right: 30px;
      height: 25px;
      line-height: 25px;
      font-size: 20px;
    }
  }

  .goods-info {
    .goods-info-item {
      margin-bottom: 50px;
      .shop {
        display: flex;
        align-items: center;
        padding-left: 20px;
        height: 60px;
        border: 2px solid @main-color;
        border-radius: 20px 20px 0 0;

        > div:first-child {
          margin-right: 15px;
          width: 35px;
          height: 35px;

          :deep(img) {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }

        > div:nth-child(2) {
          height: 35px;
          line-height: 35px;
          font-size: 25px;
        }
      }

      .goods {
        display: flex;
        border: 2px solid @main-color;
        border-top: 0;

        > div {
          padding: 9px 20px;

          width: 20%;
          font-size: 20px;
          border-right: 2px solid @main-color;
        }

        > div:last-child {
          border-right: 0;
        }

        .spu {
          display: flex;
          justify-content: space-between;
          width: 50%;

          > div:first-child {
            margin-top: 6px;
            width: 150px;
            width: 150px;

            :deep(img) {
              width: 100%;
              height: 100%;
            }
          }

          > div:nth-child(2) {
            width: 260px;
            font-size: 20px;
          }
        }

        .price {
          font-weight: bold;
          color: red;
        }

        .count {
          width: 10%;
        }
      }

      .notes {
        padding: 10px 20px;
        border: 2px solid @main-color;
        border-top: 0;
        height: 150px;

        textarea {
          padding: 10px;
          width: 100%;
          height: 100%;
          font-size: 20px;
        }
      }
    }
  }

  .total {
    display: flex;
    justify-content: right;
    margin-bottom: 20px;

    .total-price {
      display: flex;

      span {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 22px;
      }
    }

    .total-btn {
      margin-left: 30px;
      width: 120px;
      height: 50px;

      .el-btn-text {
        font-size: 20px;
      }
    }
  }
}
</style>
