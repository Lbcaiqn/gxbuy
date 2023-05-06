<script setup lang="ts">
import HomeBanner from './children/HomeBanner.vue';
import HomeRecommend from './children/HomeRecommend.vue';
import HomeFeature from './children/HomeFeature.vue';
</script>

<template>
  <div id="home" class="pc-center">
    <HomeBanner />
    <HomeRecommend />
    <HomeFeature />
  </div>
</template>

<style lang="less" scoped></style>
