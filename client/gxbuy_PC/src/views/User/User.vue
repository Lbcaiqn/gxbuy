<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import {
  getUserRecordRequest,
  favoriteRequest,
  deleteBrowseHistorySingleRequest,
  deleteBrowseHistoryAllRequest,
} from '@/api';
import { myMessage } from '@/tools/message';
import GoodsList from '@/components/content/GoodsList.vue';
import ShopList from '@/components/content/ShopList.vue';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();

// 初始化数据--------------------------------------------------------------
const userData = reactive<any>({
  data: {},
});

const current = ref<number>(1);

async function getUserRecord(options: { pageSize: number; page: number }) {
  try {
    userData.data = (await getUserRecordRequest({ feature: route.params.feature as string, ...options })).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}
getUserRecord({ pageSize: 30, page: 1 });

// 分页--------------------------------------------------------------------
async function currentPage(index: number) {
  current.value = index;
  await getUserRecord({ pageSize: 30, page: index });
  window.scrollTo({ top: 0 });
}

// 关注店铺 ------------------------------------------------------------
function followChange(index: number) {
  if (route.params.feature === 'buyed_shop') {
    userData.data.data[index].shop.isFollow = !userData.data.data[index].shop.isFollow;
  } else if (route.params.feature === 'follow') {
    userData.data.data.splice(index, 1);
  }
}

// 取消收藏 ---------------------------------------------------------------
async function cancelFavorite(payload: any) {
  try {
    await favoriteRequest(userData.data.data[payload.iIndex].goods_spu._id);
    userData.data.data.splice(payload.iIndex, 1);
  } catch (err: any) {
    myMessage(err.response || '请重新登录', 'error');
  }
}

// 删除浏览记录 ------------------------------------------------------------
const isAllDeleting = ref<boolean>(false);

async function deleteBrowseHistorySingle(payload: any) {
  try {
    await deleteBrowseHistorySingleRequest(userData.data.data[payload.tIndex].goods[payload.iIndex]._id);
    userData.data.data[payload.tIndex].goods.splice(payload.iIndex, 1);
    if (userData.data.data[payload.tIndex].goods.length === 0) userData.data.data.splice(payload.tIndex, 1);
  } catch (err: any) {
    myMessage(err.response || '请重新登录', 'error');
  }
}

async function deleteBrowseHistoryAll() {
  isAllDeleting.value = true;
  console.log(123);
  try {
    await deleteBrowseHistoryAllRequest();
    userData.data = {};
  } catch (err: any) {
    myMessage(err.response || '请重新登录', 'error');
  }
  isAllDeleting.value = false;
}
</script>

<template>
  <div id="user">
    <div class="pc-center" v-if="userData.data?.data?.length">
      <div v-if="$route.params.feature === 'favorite'">
        <div class="title">我的收藏</div>
        <GoodsList
          :goods="[{ time: null, goods: userData.data?.data?.map((d:any) => d.goods_spu)}]"
          :showShopInfo="true"
          :showDelete="true"
          :deleteText="'取消收藏'"
          @deleteClick="cancelFavorite"
        />
      </div>

      <div v-else-if="['follow', 'buyed_shop'].includes($route.params.feature as string)">
        <div class="title">{{ $route.params.feature === 'follow' ? '关注店铺' : '买过的店' }}</div>
        <ShopList :shop="userData.data?.data?.map((d:any) => d.shop)" @follow-change="followChange" />
      </div>

      <div v-else-if="$route.params.feature === 'browse_history'">
        <div class="title">
          浏览记录
          <el-button
            v-show="!isAllDeleting"
            style="margin-left: 20px"
            color="rgb(255,0,54)"
            size="large"
            round
            @click="deleteBrowseHistoryAll"
          >
            清空记录
          </el-button>
          <el-button v-show="isAllDeleting" style="margin-left: 20px" color="rgb(255,0,54)" size="large" loading round
            >请稍等</el-button
          >
        </div>
        <GoodsList
          :goods="userData.data?.data"
          :showShopInfo="true"
          :byTime="true"
          :showDelete="true"
          :deleteText="'删除记录'"
          @deleteClick="deleteBrowseHistorySingle"
        />
      </div>

      <Pagination
        class="pagination"
        :total="Number(userData.data.total)"
        :pageSize="30"
        :pageNo="current"
        :pager-count="5"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';
.title {
  margin-top: 20px;
  height: 80px;
  line-height: 80px;
  font-size: 35px;
  border-bottom: 2px solid @main-color;
}

.pagination {
  margin-top: 50px;
}
</style>
