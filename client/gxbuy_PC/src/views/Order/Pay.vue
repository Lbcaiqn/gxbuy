<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPayInfoRequest, getPayStateRequest, completePayRequest, cancelOrderRequest } from '@/api';
import { myMessage } from '@/tools/message';

const route = useRoute();
const router = useRouter();

if (typeof route.query.orderIds === 'string') route.query.orderIds = [route.query.orderIds];

// 弹框控制 -----------------------------------------------------------------------
const isShowDialog = ref<boolean>(false);
const isShowCancelRealy = ref<boolean>(false);
const isPaying = ref<boolean>(false);

// 支付 ----------------------------------------------------------------------------
const payInfo = ref<any>({});
async function pay() {
  isPaying.value = true;

  try {
    payInfo.value = (await getPayInfoRequest(route.query.orderIds as Array<string>)).data;
    isShowDialog.value = true;

    // 获取是否支付成功
    const timer = setInterval(async () => {
      const isComplete = (await getPayStateRequest(route.query.orderIds as Array<string>)).data;
      if (isComplete) clearInterval(timer);
    }, 1000);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
    isPaying.value = false;
  }
}

// 弹框操作 ---------------------------------------------------------------------------
async function dialogConfirm() {
  try {
    const res = (await completePayRequest(route.query.orderIds as Array<string>)).data;
    isShowDialog.value = false;
    isShowCancelRealy.value = false;
    myMessage(res, 'success');
    router.push('/order' + 'all');
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

function dialogCancel() {
  isShowDialog.value = false;
  isShowCancelRealy.value = true;
}

async function CancelRealyCancelOrder() {
  try {
    const res = (await cancelOrderRequest(route.query.orderIds as Array<string>)).data;
    myMessage(res, 'sucess');
    isShowCancelRealy.value = false;
    isShowCancelRealy.value = false;
    router.push('/order' + 'all');
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

function CancelRealyWaitPaid() {
  isShowCancelRealy.value = false;
  isShowCancelRealy.value = false;
  router.push('/order' + 'wait_paid');
}

function CancelRealyContinuePaid() {
  isShowCancelRealy.value = false;
  isShowDialog.value = true;
}
</script>

<template>
  <div id="pay" class="pc-center">
    <div class="title">支付方式</div>
    <div class="pay-select">
      <div class="pay-select-item">微信支付</div>
    </div>

    <el-button class="to-pay" v-show="!isPaying" color="rgb(255,0,54)" round @click="pay">
      <template #default>
        <span class="el-btn-text">支付</span>
      </template>
    </el-button>

    <el-button class="to-pay" v-show="isPaying" color="rgb(255,0,54)" loading round>
      <template #default>
        <span class="el-btn-text">请稍等</span>
      </template>
    </el-button>
  </div>

  <!-- 扫码支付弹框 -->
  <el-dialog
    v-model="isShowDialog"
    center
    :width="600"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="qrcode">
      <img src="@/assets/img/none/none_user.jpg" />
    </div>
    <div class="price">￥{{ Number(payInfo.totalPrice).toFixed(2) }}</div>
    <template #header>
      <div class="dialog-header">微信扫一扫支付</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="dialogCancel">取消</el-button>
        <el-button color="rgb(255,0,54)" size="large" @click="dialogConfirm"> 我已支付 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 确认取消订单弹框 -->
  <el-dialog
    v-model="isShowCancelRealy"
    center
    :width="600"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="tip">确认取消订单吗？您可以取消此次订单，也可以稍后支付，或继续支付此订单</div>
    <template #header>
      <div class="dialog-header">温馨提示</div>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="large" @click="CancelRealyCancelOrder">取消订单</el-button>
        <el-button size="large" @click="CancelRealyWaitPaid"> 稍后支付 </el-button>
        <el-button size="large" color="rgb(255,0,54)" @click="CancelRealyContinuePaid"> 继续支付 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#pay {
  margin: 100px auto;
  padding: 20px;
  width: 800px;
  border: 3px solid @main-color;
  border-radius: 20px;

  .title {
    padding: 20px 0 40px 0;
    font-size: 30px;
    border-bottom: 2px solid @main-color;
  }

  .pay-select {
    padding: 40px 0;
    border-bottom: 2px solid @main-color;

    .pay-select-item {
      width: 150px;
      height: 50px;
      line-height: 46px;
      text-align: center;
      font-size: 20px;
      color: red;
      cursor: pointer;
      border: 2px solid @main-color;

      border-radius: 10px;
    }
  }

  .to-pay {
    margin: 40px 0;
    width: 100%;
    height: 80px;

    .el-btn-text {
      font-size: 30px;
    }
  }
}

.dialog-header {
  margin-left: 180px;
  width: 200px;
  text-align: center;
  font-size: 25px;
}

.dialog-footer button {
  width: 100px;

  &:first-child {
    margin-right: 10px;
  }
}

.qrcode {
  margin: 0 auto;
  width: 200px;
  width: 200px;

  img {
    width: 100%;
  }
}

.tip {
  margin: 0 auto;
  width: 400px;
  font-size: 22px;
}

.price {
  margin: 20px auto 0;
  width: 100px;
  font-weight: bold;
  font-size: 25px;
  color: red;
  text-align: center;
}
</style>
