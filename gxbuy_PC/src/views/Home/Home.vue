<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue';
import { getHomeData } from '@/api/index';
import { HomeDataType } from '@/types/index'

import HomeBanner from "./child/HomeBanner.vue";
import HomeRecommend from "./child/HomeRecommend.vue";
import HomeRank from "./child/HomeRank.vue";
import HomeLike from "./child/HomeLike.vue";
import HomeFloor from "./child/HomeFloor.vue";
import HomeBrand from "./child/HomeBrand.vue";

const Category = defineAsyncComponent(() => import('@/components/common/Category/Category.vue'));


let HomeData = ref<HomeDataType>({});

getHomeData().then(res => {
  HomeData.value = res.data.data;
});


</script>

<template>
  <Suspense>
    <template v-slot:default>
      <div>
        <Category />
      </div>
    </template>
    <template v-slot:fallback>
      <h3>loading...</h3>
    </template>
  </Suspense>

  <div v-if="Object.keys(HomeData).length != 0">
    <HomeBanner :bannerList="HomeData.bannerList!" :todayMessage="HomeData.todayMessage!" />
    <HomeRecommend :recommend="HomeData.recommend!" />
    <HomeRank :rank="HomeData.rank!" />
    <HomeLike :like="HomeData.like!" />
    <HomeFloor v-for="i in HomeData.floor!" :key="i.id" :floor="i" />
    <HomeBrand :brand="HomeData.brand!" />
  </div>
</template>

<style lang='less' scoped></style>
