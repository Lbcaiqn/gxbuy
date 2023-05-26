<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { UserStore } from '@/store';
import { getUserInfoRequest } from '@/api';
import { myMessage } from '@/tools/message';
import NoneUserImg from '@/assets/img/none/none_user.jpg';

const route = useRoute();
const userStore = UserStore();

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

async function getUserInfo() {
  if (!userStore.gxbuy_PC_jwt) return;

  try {
    const res = (await getUserInfoRequest()).data;
    userStore.userInfo = res;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

getUserInfo();

watch(
  () => route.name,
  () => {
    getUserInfo();
  }
);
</script>

<template>
  <div id="home-profile">
    <div class="user-info" :style="{ height: userStore.gxbuy_PC_jwt ? '50%' : '65%' }">
      <div class="user-img">
        <img
          :src="userStore.userInfo.user_icon ? baseURL + userStore.userInfo.user_icon : NoneUserImg"
          :zoom-rate="1.2"
          :preview-src-list="[userStore.userInfo.user_icon ? baseURL + userStore.userInfo.user_icon : NoneUserImg]"
          :initial-index="0"
          hide-on-click-modal
          lazy
        />
      </div>
      <div class="user-name">{{ userStore.userInfo.user_name || 'Hi，欢迎！' }}</div>
    </div>
    <div class="user-option" v-if="!userStore.gxbuy_PC_jwt">
      <div class="user-option-btn" @click="$router.push('/login')">登录</div>
      <div class="user-option-btn" @click="$router.push('/user_register')">注册</div>
      <div class="user-option-btn" @click="$router.push('/shop_register')">开店</div>
    </div>
    <div class="user-profile" v-else>
      <div class="buys">
        <div class="buys-item" @click="$router.push('/order' + 'wait_paid')">
          <div>{{ userStore.userInfo.order_total_wait_paid }}</div>
          <div>待付款</div>
        </div>
        <div class="buys-item" @click="$router.push('/order' + 'wait_shipped')">
          <div>{{ userStore.userInfo.order_total_wait_shipped }}</div>
          <div>待发货</div>
        </div>
        <div class="buys-item" @click="$router.push('/order' + 'wait_receive')">
          <div>{{ userStore.userInfo.order_total_wait_receive }}</div>
          <div>待收货</div>
        </div>
        <div class="buys-item" @click="$router.push('/order' + 'wait_comment')">
          <div>{{ userStore.userInfo.order_total_wait_comment }}</div>
          <div>待评价</div>
        </div>
      </div>
      <div class="cart">
        <div class="cart-item" @click="$router.push('/shopcart')">
          <div>
            <i class="iconfont icon-dianshang"></i>
          </div>
          <div>购物车</div>
          <div class="tag" v-show="userStore.userInfo.shopcart_total_all">
            {{ userStore.userInfo.shopcart_total_all > 99 ? '99+' : userStore.userInfo.shopcart_total_all }}
          </div>
        </div>
        <div class="cart-item" @click="$router.push('/order' + 'all')">
          <div>
            <i class="iconfont icon-rili"></i>
          </div>
          <div>我的订单</div>
        </div>
        <div class="cart-item" @click="$router.push('/user' + 'favorite')">
          <div>
            <i class="iconfont icon-shoucang-moren"></i>
          </div>
          <div>我的收藏</div>
        </div>
        <div class="cart-item" @click="$router.push('/user' + 'follow')">
          <div>
            <i class="iconfont icon-liulan"></i>
          </div>
          <div>关注店铺</div>
        </div>
        <div class="cart-item" @click="$router.push('/user' + 'buyed_shop')">
          <div>
            <i class="iconfont icon-shouce"></i>
          </div>
          <div>买过的店</div>
        </div>
        <div class="cart-item" @click="$router.push('/user' + 'browse_history')">
          <div>
            <i class="iconfont icon-shizhong"></i>
          </div>
          <div>浏览记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#home-profile {
  height: 444px;
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .user-img {
      width: 100px;
      height: 100px;

      :deep(img) {
        width: 100%;
        border-radius: 50px;
      }
    }

    .user-name {
      width: 100%;
      margin-top: 10px;
      font-size: 20px;
      text-align: center;
    }
  }

  .user-option {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 25%;

    .user-option-btn {
      margin: 0 8px;
      width: 70px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      color: #fff;
      background-color: @main-color;
      border: 2px solid @main-color;
      border-radius: 10px;
    }
  }

  .user-profile {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;

    .buys {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 33%;

      .buys-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        cursor: pointer;

        > div:first-child {
          height: 20px;
          line-height: 20px;
        }

        > div:nth-child(2) {
          height: 30px;
          line-height: 30px;
        }
      }
    }

    .cart {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 66%;
      .cart-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 33%;
        height: 50%;
        cursor: pointer;

        .tag {
          position: absolute;
          top: 10px;
          right: 25px;
          padding: 2px 5px;
          color: #fff;
          background-color: red;
          border: 1px solid red;
          border-radius: 5px;
        }

        > div:first-child {
          margin-bottom: 10px;
          height: 25px;
          line-height: 33px;

          i {
            font-size: 30px;
            color: #000;
          }
        }

        > div:nth-child(2) {
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
