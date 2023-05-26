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
    shop: any[];
  }>(),
  {
    shop: () => [],
  }
);

const emits = defineEmits(['followChange']);

const followText = ref<string>('已关注');

const follow = throttle(async (index: number) => {
  try {
    emits('followChange', index);
    await followRequest(props.shop[index]._id);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 100);
</script>

<template>
  <div id="shop-list" v-if="shop.length !== 0">
    <div class="shop-item" v-for="(i, iIndex) in shop" :key="i._id">
      <div class="shop-item-info">
        <div class="info">
          <div>
            <el-image :src="baseURL + i.shop_logo" lazy />
          </div>
          <div>{{ i.shop_name }}</div>
        </div>
        <div class="btn">
          <div @click="$router.push('/shop' + i._id)">进店看看</div>
          <div v-if="!i.isFollow" @click="follow(iIndex)"><i class="iconfont icon-tianjia"></i> 关注店铺</div>
          <div v-else @click="follow(iIndex)" @mouseover="followText = '取消关注'" @mouseleave="followText = '已关注'">
            {{ followText }}
          </div>
        </div>
      </div>
      <div class="shop-item-hot">
        <div v-for="g in i.goods_spu" :key="g._id">
          <div class="img" @click="$router.push('/goods' + g._id)">
            <el-image :src="g.goods_spu_main_img" lazy />
          </div>
          <div class="price">￥{{ g.goods_first_sku_price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#shop-list {
  margin-top: 20px;
  .shop-item {
    display: flex;
    border-bottom: 2px solid @main-color;

    .shop-item-info {
      width: 25%;

      .info {
        display: flex;
        margin-top: 10px;
        padding: 10px;
        width: 90%;

        > div:first-child {
          margin-right: 20px;
          width: 50px;
          height: 50px;

          :deep(img) {
            width: 100%;
            height: 100%;
            border-radius: 25px;
          }
        }

        > div:nth-child(2) {
          height: 50px;
          line-height: 50px;
          font-size: 25px;
        }
      }

      .btn {
        display: flex;
        justify-content: space-around;
        margin: 20px auto;
        margin-top: 84px;

        > div {
          width: 45%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 20px;
          cursor: pointer;
          color: #fff;
          background-color: @main-color;
          border: 1px solid @main-color;
          border-radius: 10px;
        }
      }
    }

    .shop-item-hot {
      display: flex;
      justify-content: space-around;
      margin: 10px 0;
      margin-left: 20px;
      padding: 10px;
      width: 75%;

      .img {
        display: flex;
        width: 160px;
        height: 160px;
        cursor: pointer;

        :deep(img) {
          width: 100%;
          height: 100%;
        }
      }

      .price {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        color: red;
      }
    }
  }
}
</style>
