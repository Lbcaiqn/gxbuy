<script setup lang="ts" name="search">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getSearchRequest } from '@/api';
import { myMessage } from '@/tools/message';
import GoodsList from '@/components/content/GoodsList.vue';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();

// 初始化数据--------------------------------------------------------------
const current = ref<number>(1);
const goods = reactive<any>({
  goodsList: {},
});

async function getSearchData(options: {
  keyword?: string;
  c1id?: number;
  c2id?: number;
  c3id?: number;
  pageSize?: number;
  page?: number;
}) {
  try {
    goods.goodsList = (await getSearchRequest(options)).data;
  } catch (err: any) {
    myMessage('网络异常', 'error');
  }
}
getSearchData(route.query);

// 分页-------------------------------------------------------------------------
async function currentPage(page: number) {
  current.value = page;
  await getSearchData({ ...route.query, page });
  window.scrollTo({ top: 0 });
}
</script>

<template>
  <div id="search">
    <div class="pc-center">
      <GoodsList :goods="[{ time: null, goods: goods.goodsList.data }]" :showShopInfo="true" />
      <Pagination
        class="pagination"
        :total="Number(goods.goodsList.total)"
        :pageSize="30"
        :pageNo="current"
        :pager-count="5"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
#search {
  .pagination {
    margin-top: 50px;
  }
}
</style>
