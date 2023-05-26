<script setup lang="ts">
import { ref } from 'vue';
import { followRequest } from '@/api';
import { throttle } from '@/tools/lodash';
import { myMessage } from '@/tools/message';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

const props = withDefaults(
  defineProps<{
    shopInfo: any;
    isFollow: boolean;
    showEnter?: boolean;
  }>(),
  {
    shopInfo: {},
    isFollow: false,
    showEnter: false,
  }
);

const emits = defineEmits(['followChange']);

const followText = ref<string>('已关注');

const follow = throttle(async () => {
  try {
    emits('followChange');
    await followRequest(props.shopInfo._id);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);
</script>

<template>
  <div id="goods-shop-info" v-if="JSON.stringify(shopInfo) !== '{}'">
    <div class="shop">
      <div class="shop-info">
        <div>
          <el-image :src="baseURL + shopInfo.shop_logo" lazy />
        </div>
        <div>{{ shopInfo.shop_name }}</div>
      </div>
      <div class="shop-options">
        <div v-if="!isFollow" @click="follow"><i class="iconfont icon-tianjia"></i> 关注店铺</div>
        <div v-else @click="follow" @mouseover="followText = '取消关注'" @mouseleave="followText = '已关注'">
          {{ followText }}
        </div>
        <div v-if="showEnter" @click="$router.push('/shop' + shopInfo._id)">进入店铺</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#goods-shop-info {
  margin-bottom: 30px;
  border-bottom: 2px solid @main-color;
  .shop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    .shop-info {
      display: flex;
      align-items: center;
      width: 300px;

      > div:first-child {
        width: 40px;
        height: 40px;

        :deep(img) {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }

      > div:nth-child(2) {
        margin-left: 12px;
        height: 40px;
        line-height: 38px;
        font-size: 25px;
      }
    }

    .shop-options {
      display: flex;

      > div {
        margin-left: 10px;
        width: 150px;
        height: 50px;
        line-height: 45px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        background-color: @main-color;
        border: 2px solid @main-color;
        border-radius: 15px;
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
