<script setup lang="ts">
import { ref } from 'vue';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

withDefaults(
  defineProps<{
    goods: any[];
    showShopInfo?: boolean;
  }>(),
  {
    goods: () => [],
    showShopInfo: false,
  }
);
</script>

<template>
  <div id="goods-list">
    <div class="goods-item" v-for="i in goods" :key="i._id">
      <div class="goods-item-box" @click="$router.push('/goods' + i._id)">
        <div class="goods-item-img"><img :src="i.goods_spu_main_img" /></div>
        <div class="goods-item-content">
          <div class="goods-name">{{ i.goods_spu_name }}</div>
          <div class="goods-price">
            <div>￥{{ i.goods_first_sku_price }}</div>
            <div>广东 深圳</div>
          </div>
          <div class="goods-num">
            <div>销量 {{ i.goods_sku_total_sales }}</div>
            <div>收藏 {{ i.goods_spu_total_favorite }}</div>
          </div>
          <div class="goods-shop" v-if="showShopInfo">
            <div><img :src="baseURL + i.shop.shop_logo" /></div>
            <div>{{ i.shop.shop_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#goods-list {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;

  .goods-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    width: 20%;
    height: 400px;

    .goods-item-box {
      display: flex;
      justify-content: top;
      align-items: center;
      flex-direction: column;
      width: 95%;
      cursor: pointer;
      border: 2px solid #000;
      border-radius: 20px;

      .goods-item-img {
        width: 100%;
        height: 245px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }

      .goods-item-content {
        padding: 15px;

        .goods-name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .goods-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;

          > div:first-child {
            font-size: 24px;
            color: red;
          }
        }

        .goods-num {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 12px 0;
          font-size: 12px;
          color: gray;
        }

        .goods-shop {
          display: flex;
          justify-content: left;
          align-items: center;

          > div {
            height: 15px;
            line-height: 15px;
          }

          > div:first-child {
            margin-right: 10px;
            width: 15px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 7.5px;
            }
          }
        }
      }
    }
  }
}
</style>
