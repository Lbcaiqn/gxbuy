<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getSearchRequest } from '@/api';
import GoodsList from '@/components/content/GoodsList.vue';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();

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
  const a = (await getSearchRequest(options)).data;
  goods.goodsList = a;
}
getSearchData(route.query);

function currentPage(page: number) {
  current.value = page;
  getSearchData({ ...route.query, page });
  window.scrollTo({ top: 0 });
}
</script>

<template>
  <div id="search">
    <div class="pc-center">
      <GoodsList :goods="goods.goodsList.data" />
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
