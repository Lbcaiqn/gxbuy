<script setup lang="ts">
import { ref, reactive } from 'vue';
import { getRecommendDataRequest } from '@/api';
import EventBus from '@/EventBus';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

const homeData = reactive<any>({
  recommend: [],
});

async function getRecommendData() {
  homeData.recommend = (await getRecommendDataRequest()).data;
}

getRecommendData();
</script>

<template>
  <div id="home-recommend">
    <div class="home-recommend-item" v-for="i in homeData.recommend" :key="i._id">
      <div class="title">{{ i.name }}</div>
      <div class="content" @click="$router.push({ path: '/search', query: { keyword: i.keyword } })">
        <div>
          <img :src="baseURL + i.img" />
        </div>
        <div v-for="j in i.children" :key="j._id">
          <img :src="baseURL + j.img" @load="EventBus.emit('imgLoadFinish')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#home-recommend {
  margin-top: 50px;
  .title {
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #000;
    font-size: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    cursor: pointer;

    > div {
      width: 240px;
      height: 240px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
