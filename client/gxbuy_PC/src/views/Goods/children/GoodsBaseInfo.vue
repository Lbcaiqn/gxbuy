<script setup lang="ts">
import { ref } from 'vue';
import Counter from '@/components/common/Counter.vue';

const count = ref<number>(1);

withDefaults(
  defineProps<{
    baseInfo: any;
  }>(),
  {
    baseInfo: {},
  }
);
</script>

<template>
  <div id="goods-base-info" v-if="JSON.stringify(baseInfo) !== '{}'">
    <div class="goods-info">
      <div class="goods-name">{{ baseInfo.goods_spu_name }}</div>
      <div class="goods-price">￥{{ baseInfo.goods_first_sku_price }}</div>
      <div class="goods-num">
        <div>数据：</div>
        <div>销量 {{ baseInfo.goods_sku_total_sales }}</div>
        <div>库存 {{ baseInfo.goods_sku_total_stock }}</div>
        <div>收藏 {{ baseInfo.goods_spu_total_favorite }}</div>
      </div>
      <div class="goods-address">
        <div>配送：</div>
        <div>广东 深圳</div>
      </div>

      <div class="goods-sku">
        <div class="goods-sku-item" v-for="(i, iIndex) in baseInfo.spu_sales_attrs" :key="iIndex">
          <div class="goods-sku-item-name">{{ i.name }}：</div>
          <div class="goods-sku-item-content">
            <div v-for="(j, jIndex) in i.values" :key="jIndex">
              <div><img :src="baseInfo.goods_sku[jIndex].goods_sku_img" /></div>
              <div>{{ j }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="goods-sku-select">
        <div>已选择：</div>
        <div>默认</div>
        <div>库存：{{ baseInfo.goods_sku[0].goods_sku_stock }} 有货</div>
      </div>

      <div class="goods-count">
        <Counter :count="count" @countUpdate="count = $event" />
      </div>

      <div class="goods-btn">
        <div>加入购物车</div>
        <div>立即购买</div>
        <div>收藏商品</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#goods-base-info {
  .goods-info {
    padding: 0 20px 20px 20px;
    width: 100%;

    > div {
      margin-top: 15px;
    }
    .goods-name {
      margin: 0;
      font-size: 22px;
    }

    .goods-price {
      font-size: 35px;
      font-weight: bold;
      color: red;
    }

    .goods-num {
      display: flex;
      justify-content: left;
      align-items: center;

      > div {
        margin-right: 20px;
      }

      > div:first-child {
        margin: 0;
        width: 12%;
      }
    }

    .goods-address {
      display: flex;

      > div:first-child {
        width: 12%;
      }
    }

    .goods-sku {
      .goods-sku-item {
        display: flex;
        font-size: 18px;

        .goods-sku-item-name {
          width: 12%;
          height: 35px;
          line-height: 35px;
        }
        .goods-sku-item-content {
          display: flex;
          flex-wrap: wrap;
          width: 88%;

          > div {
            display: flex;
            align-items: center;
            padding: 0 15px;
            margin: 0 10px 10px 0;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            border: 2px solid #000;
            border-radius: 5px;

            > div:first-child {
              margin: 0 15px 0 -12px;
              width: 30px;
              height: 30px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }

    .goods-sku-select {
      display: flex;
      margin-top: 30px;

      > div:first-child {
        width: 12%;
      }

      > div:nth-child(2) {
        width: 48%;
      }

      > div:nth-child(3) {
        width: 40%;
      }
    }

    .goods-count {
      margin-top: 70px;
    }

    .goods-btn {
      display: flex;
      margin-top: 82px;

      > div {
        margin-right: 20px;
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 22px;
        cursor: pointer;
        border: 2px solid #000;
        border-radius: 20px;
      }
    }
  }
}
</style>
