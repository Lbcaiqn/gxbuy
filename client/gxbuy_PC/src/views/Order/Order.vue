<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getOrderDataRequest, cancelOrderRequest } from '@/api';
import { formatDate } from '@/tools/formatDate';
import { myMessage } from '@/tools/message';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();
const router = useRouter();

// 初始化数据----------------------------------------------------------------
const orderType = ref<string>(
  ['all', 'wait_paid', 'wait_shipped', 'wait_receive', 'wait_comment'].includes(route.params.feature as string)
    ? (route.params.feature as string)
    : 'all'
);

const orderTypeTitle = [
  { id: 'all', title: '全部订单' },
  { id: 'wait_paid', title: '待付款' },
  { id: 'wait_shipped', title: '待发货' },
  { id: 'wait_receive', title: '待收货' },
  { id: 'wait_comment', title: '待评价' },
];

const current = ref<number>(1);

const orderData = reactive<any>({
  data: {},
});

async function getOrderData(options: { feature: string; pageSize: number; page: number }) {
  try {
    orderData.data = (await getOrderDataRequest(options)).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}
getOrderData({ feature: orderType.value, pageSize: 10, page: 1 });

// 切换不同类型的订单---------------------------------------------------------
async function orderTypeChange(id: string) {
  current.value = 1;
  orderType.value = id;
  await getOrderData({ feature: orderType.value, pageSize: 10, page: 1 });
}

// 分页------------------------------------------------------------------------
async function currentPage(index: number) {
  current.value = index;
  await getOrderData({ feature: orderType.value, pageSize: 10, page: index });
  window.scrollTo({ top: 0 });
}

// 某个订单总价格，以及订单状态----------------------------------------------
function orderTotalPrice(data: Array<{ price: string; quantity: number }>) {
  return data
    .reduce((acc: number, item: any) => {
      return (acc += Number(item.price) * item.quantity);
    }, 0)
    .toFixed(2);
}

function orderState(state: string) {
  let str = '';

  if (state === 'finish') str = '交易完成';
  else if (state === 'wait_paid') str = '待付款';
  else if (state === 'wait_shipped') str = '待发货';
  else if (state === 'wait_receive') str = '待收货';
  else if (state === 'wait_comment') str = '待评价';
  else if (state === 'cancel') str = '交易取消';
  else if (state === 'invalid') str = '无效订单';

  return str;
}

// 待付款的订单处理----------------------------------------------------------------

// 支付
const isPaying = ref<boolean>(false);
function pay(orderId: string) {
  isPaying.value = true;
  router.push({
    path: 'pay',
    query: { orderIds: [orderId] },
  });
  isPaying.value = false;
}

// 取消订单
const isCanceling = ref<boolean>(false);
async function cancelOrder(orderId: string, orderIndex: number) {
  isCanceling.value = true;

  try {
    const res = (await cancelOrderRequest([orderId])).data;
    orderData.data.data.splice(orderIndex, 1);
    myMessage(res, 'success');
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }

  isCanceling.value = false;
}
</script>

<template>
  <div id="order" class="pc-center" v-if="JSON.stringify(orderData.data) !== '{}'">
    <div class="controller">
      <div
        v-for="t in orderTypeTitle"
        :key="t.id"
        :class="{ active: orderType === t.id }"
        @click="orderTypeChange(t.id)"
      >
        {{ t.title }}
      </div>
    </div>

    <div class="container" v-for="(order, orderIndex) in orderData.data.data" :key="order._id">
      <div class="title">
        <div>{{ formatDate(new Date(order.add_time), 'yyyy-0M-0d 0h:0m:0s') }}</div>
        <div>订单编号: {{ order._id }}</div>
        <div>{{ order.order_item[0].shop_name }}</div>
        <div>
          总价: ￥{{
            orderTotalPrice(
              order.order_item.map((item: any) => {
                return { price: item.goods_sku_price, quantity: item.quantity };
              })
            )
          }}
        </div>
        <div>{{ orderState(order.order_state) }}</div>
      </div>
      <div class="content" v-for="orderItem in order.order_item" :key="orderItem._id">
        <div class="goods-info" @click="$router.push('/goods' + orderItem.goods_spu_id)">
          <div class="img"><img :src="orderItem.goods_sku_img" /></div>
          <div class="info">
            <div>{{ orderItem.goods_spu_name }}</div>
            <div>
              {{
                orderItem.sku_sales_attrs.reduce(
                  (acc: string, item: any) => (acc += item.name + ': ' + item.value + ' '),
                  ''
                )
              }}
            </div>
          </div>
        </div>
        <div class="price">￥{{ orderItem.goods_sku_price }}</div>
        <div class="count">{{ orderItem.quantity }}</div>
        <div class="total-price">共: ￥{{ (Number(orderItem.goods_sku_price) * orderItem.quantity).toFixed(2) }}</div>
        <div class="operate" v-if="orderType === 'all'">追加评价</div>
        <div class="operate" v-else-if="orderType === 'wait_commend'">评价</div>
      </div>

      <div class="footer">
        <div class="notes">备注：无</div>
        <div class="order-operate" v-if="orderType === 'wait_paid'">
          <el-button
            v-show="!isCanceling"
            color="rgb(255,0,54)"
            size="large"
            round
            @click="cancelOrder(order._id, orderIndex)"
          >
            取消订单
          </el-button>
          <el-button v-show="isCanceling" color="rgb(255,0,54)" size="large" loading round>请稍等</el-button>

          <el-button v-show="!isPaying" color="rgb(255,0,54)" size="large" round @click="pay(order._id)"
            >去支付</el-button
          >
          <el-button v-show="isPaying" color="rgb(255,0,54)" size="large" loading round>请稍等</el-button>
        </div>
      </div>
    </div>

    <Pagination
      class="pagination"
      :total="Number(orderData.data.total)"
      :pageSize="10"
      :pageNo="current"
      :pager-count="5"
      @currentPage="currentPage"
    />
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#order {
  .controller {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    border-bottom: 2px solid @main-color;

    > div {
      width: 150px;
      height: 50opx;
      line-height: 50px;
      text-align: center;
      font-size: 25px;
    }

    .active {
      font-weight: bold;
      color: @main-color;
      border-bottom: 1px solid @main-color;
    }
  }

  .container {
    margin: 50px 0;
    border: 3px solid @main-color;
    border-radius: 20px;

    .title {
      display: flex;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 80px;
      border-bottom: 3px solid @main-color;

      > div {
        height: 80px;
        line-height: 80px;
        font-size: 22px;
      }

      > div:nth-child(1),
      > div:nth-child(2) {
        width: 25%;
      }

      > div:nth-child(3),
      > div:nth-child(4) {
        width: 20%;
      }

      > div:nth-child(5) {
        width: 10%;
        text-align: center;
      }
    }

    .content {
      display: flex;
      height: 200px;
      border-bottom: 3px solid @main-color;

      > div {
        padding: 20px;
        padding-top: 15px;
        width: 175px;
        height: 100%;
        font-size: 20px;
        border-right: 3px solid @main-color;
        box-sizing: border-box;
      }

      > div:last-child {
        border-right: 0;
      }

      .goods-info {
        display: flex;
        width: 500px;
        cursor: pointer;

        .img {
          margin-right: 30px;
          margin-top: 5px;
          width: 160px;
          height: 160px;

          :deep(img) {
            width: 100%;
            height: 100%;
          }
        }

        .info {
          width: 280px;

          > div:first-child {
            height: 60px;
            margin-bottom: 15px;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          > div:last-child {
            font-size: 15px;
            color: gray;
          }
        }
      }

      .count,
      .operate {
        width: 125px;
      }

      .price {
        font-weight: bold;
        color: red;
      }
      .total-price {
        width: 275px;
        font-weight: bold;
        color: red;
      }
    }

    .footer {
      display: flex;
      padding: 20px;
      height: 80px;
      .notes {
        width: 50%;
      }

      .order-operate {
        display: flex;
        justify-content: right;
        align-items: center;
        width: 50%;

        button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
