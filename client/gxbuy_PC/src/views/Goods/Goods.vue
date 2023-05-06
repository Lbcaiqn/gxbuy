<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsDetailDataRequest, getGoodsByShopRequest, getGoodsCommentRequest } from '@/api';
import GoodsShopInfo from './children/GoodsShopInfo.vue';
import GoodsBaseInfo from './children/GoodsBaseInfo.vue';
import GoodsBanner from './children/GoodsBanner.vue';
import GoodsDetail from './children/GoodsDetail.vue';

const route = useRoute();

const goods = reactive<any>({
  detail: {},
  shopByGoods: [],
  comment: {},
  parameter: [],
});

async function getGoodsData(id: string) {
  goods.detail = (await getGoodsDetailDataRequest(id)).data;
  goods.goodsByShop = (await getGoodsByShopRequest(goods.detail.shop_id, { pageSize: 10, page: 1 })).data;
  goods.comment = (await getGoodsCommentRequest(id, { pageSize: 15, page: 1 })).data;
  goods.parameter = goods.detail.goods_attribute
    .map((i: any) => {
      return {
        name: i.attribute.attr_name,
        value: i.goods_instance_value,
      };
    })
    .filter((i: any) => i.value);
}
getGoodsData(route.params.id as string);

async function currentPage(page: number) {
  goods.comment = (await getGoodsCommentRequest(route.params.id as string, { pageSize: 15, page })).data;
}
</script>

<template>
  <div id="goods" v-if="JSON.stringify(goods.detail) !== '{}'">
    <div class="pc-center">
      <GoodsShopInfo :shopInfo="goods.detail.shop" />
      <div class="goods-base-info">
        <div class="goods-banner">
          <GoodsBanner :img="goods.detail.goods_img.filter((i: any) => i.goods_img_type === 'banner')" />
        </div>
        <div class="goods-info"><GoodsBaseInfo :baseInfo="goods.detail" /></div>
      </div>
      <GoodsDetail
        :parameter="goods.parameter"
        :img="goods.detail.goods_img.filter((i: any) => i.goods_img_type === 'detail')"
        :goodsByShop="goods.goodsByShop"
        :comment="goods.comment"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
#goods {
  .goods-base-info {
    display: flex;
    justify-content: space-between;

    .goods-banner {
      width: 35%;
    }
    .goods-info {
      width: 60%;
    }
  }
}
</style>
