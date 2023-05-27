<script setup lang="ts">
import MySwiper from '@/components/common/MySwiper.vue';

withDefaults(
  defineProps<{
    img: any[];
  }>(),
  {
    img: () => [],
  }
);
</script>

<template>
  <div id="goods-banner" v-if="img.length !== 0">
    <MySwiper
      :img="img.map(i => i.goods_img_url)"
      :delay="3000"
      :banner-height="420"
      :loop="true"
      :effect="'fade'"
      :speed="500"
      :useZoom="true"
      :thumbs="true"
      :thumbsProps="{
        img: img.map(i => i.goods_img_url),
        bannerHeight: 80,
        loop: false,
        delay: 3000,
        navigation: true,
        slidesPerView: 5,
        spaceBetween: 5,
      }"
    />
  </div>
</template>

<style lang="less" scoped></style>
