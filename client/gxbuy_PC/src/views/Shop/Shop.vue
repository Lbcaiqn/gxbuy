<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getShopInfoDataRequest, getGoodsByShopRequest } from '@/api';
import { myMessage } from '@/tools/message';
import ShopInfo from '@/components/content/ShopInfo.vue';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();

const shopData = reactive<any>({
  shopInfo: {},
  goods: [],
});

async function getShopInfoData(shopId: string) {
  try {
    shopData.shopInfo = (await getShopInfoDataRequest(shopId)).data;
    shopData.goods = (await getGoodsByShopRequest(shopId, { pageSize: 30, page: 1 })).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '网络异常', 'error');
  }
}

getShopInfoData(route.params.id as string);

const current = ref<number>(1);

async function currentPage(page: number) {
  current.value = page;
  try {
    shopData.goods = (await getGoodsByShopRequest(route.params.id as string, { pageSize: 30, page })).data;
    window.scrollTo({ top: 0 });
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '网络异常', 'error');
  }
}
</script>

<template>
  <div id="shop" class="pc-center">
    <div class="shop-info" v-if="JSON.stringify(shopData.shopInfo) !== '{}'">
      <ShopInfo
        :shopInfo="shopData.shopInfo"
        :isFollow="shopData.shopInfo.isFollow"
        @followChange="shopData.shopInfo.isFollow = !shopData.shopInfo.isFollow"
      />
      <GoodsList :goods="[{ time: null, goods: shopData.goods.data }]" />
      <Pagination
        class="pagination"
        :total="Number(shopData.goods.total)"
        :pageSize="30"
        :pageNo="current"
        :pager-count="5"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  margin-top: 50px;
}
</style>
