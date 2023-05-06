<script setup lang="ts">
import { ref } from 'vue';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

withDefaults(
  defineProps<{
    shopInfo: any;
  }>(),
  {
    shopInfo: {},
  }
);
</script>

<template>
  <div id="goods-shop-info" v-if="JSON.stringify(shopInfo) !== '{}'">
    <div class="shop">
      <div class="shop-info">
        <div><img :src="baseURL + shopInfo.shop_logo" /></div>
        <div>{{ shopInfo.shop_name }}</div>
      </div>
      <div class="shop-options">
        <div>关注店铺</div>
        <div>进入店铺</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#goods-shop-info {
  .shop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 50px 0;
    height: 50px;

    .shop-info {
      display: flex;
      align-items: center;
      width: 300px;

      > div:first-child {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }

      > div:nth-child(2) {
        margin-left: 12px;
        font-size: 20px;
      }
    }

    .shop-options {
      display: flex;
      > div {
        margin-left: 5px;
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        border: 2px solid #000;
        border-radius: 20px;
      }
    }
  }
}
</style>
