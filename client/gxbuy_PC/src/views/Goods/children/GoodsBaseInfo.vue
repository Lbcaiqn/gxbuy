<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { insertShopcartDataRequest, favoriteRequest } from '@/api';
import { throttle } from '@/tools/lodash';
import { myMessage } from '@/tools/message';
import Counter from '@/components/common/Counter.vue';

const router = useRouter();

// Props  Emits
const props = withDefaults(
  defineProps<{
    baseInfo: any;
    isFavorite: boolean;
  }>(),
  {
    baseInfo: {},
    isFavorite: false,
  }
);

const emits = defineEmits(['favoriteChange']);

// 选择的sku
const count = ref<number>(1);
const isSelectedSku = ref<any>(null);
const isSelectedSkuId = ref<string | null>(null);

watch(
  () => isSelectedSku.value,
  newVal => {
    const sku = props.baseInfo.goods_sku.find(
      (item: any) => JSON.stringify(item.sku_sales_attrs) === JSON.stringify(newVal)
    );

    if (sku) isSelectedSkuId.value = sku._id;
  }
);

watch(
  () => props.baseInfo,
  newVal => {
    if (JSON.stringify(newVal) === '{}') return;
    isSelectedSku.value = newVal.goods_sku[0].sku_sales_attrs;
  },
  { immediate: true }
);

// 加入购物车--------------------------------------------------------
const insertShopcart = throttle(async () => {
  const insertInfo = {
    goods_spu_id: props.baseInfo._id,
    goods_sku_id: props.baseInfo.goods_sku.find(
      (sku: any) => JSON.stringify(sku.sku_sales_attrs) === JSON.stringify(isSelectedSku.value)
    )._id,
    shop_id: props.baseInfo.shop_id,
    quantity: count.value,
  };

  try {
    const res = (await insertShopcartDataRequest(insertInfo)).data;
    myMessage(res, 'success');
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage, 'error');
  }
}, 1000);

// 收藏商品
const favoriteText = ref<string>('已收藏');
const favorite = throttle(async () => {
  try {
    emits('favoriteChange');
    await favoriteRequest(props.baseInfo._id);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}, 500);

const buy = throttle(() => {
  if (!isSelectedSkuId) return;

  router.push({
    path: '/confirmOrder',
    query: {
      fromGoods: isSelectedSkuId.value,
      quantity: count.value,
    },
  });
}, 100);
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
        <div>{{ isSelectedSku.reduce((acc: string, attr: any) => (acc += attr.value + ' '), '') }}</div>
        <div>库存：{{ baseInfo.goods_sku[0].goods_sku_stock }} 有货</div>
      </div>

      <div class="goods-count">
        <Counter :count="count" @countUpdate="count = $event" />
      </div>

      <div class="goods-btn">
        <div @click="insertShopcart">加入购物车</div>
        <div @click="buy">立即购买</div>
        <div v-if="!isFavorite" @click="favorite">
          <i class="iconfont icon-shoucang-moren" style="color: #fff"></i>
          收藏商品
        </div>
        <div v-else @click="favorite" @mouseover="favoriteText = '取消收藏'" @mouseleave="favoriteText = '已收藏'">
          <i class="iconfont icon-shoucang-gaoliang" style="color: #fff"></i>
          {{ favoriteText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#goods-base-info {
  .goods-info {
    padding: 0 20px 20px 20px;
    width: 100%;

    > div {
      margin-top: 15px;
    }
    .goods-name {
      margin: 0;
      font-weight: bold;
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
            border: 2px solid @main-color;
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
      margin-top: 50px;
    }

    .goods-btn {
      display: flex;
      margin-top: 81px;

      > div {
        margin-right: 20px;
        width: 180px;
        height: 50px;
        line-height: 45px;
        text-align: center;
        font-size: 22px;
        cursor: pointer;
        color: #fff;
        background-color: @main-color;
        border: 2px solid @main-color;
        border-radius: 10px;
      }

      i {
        font-size: 25px;
        color: #000;
      }
    }
  }
}
</style>
