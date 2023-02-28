<template>
  <div class="swiperbox">
    <swiper :slidesPerView="1" :spaceBetween="30" :loop="true" :centeredSlides="true" :pagination="{ clickable: true }"
      :autoplay="{ delay: 1000, disableOnInteraction: false }" :navigation="true" :modules="modules" class="mySwiper">
      <swiper-slide><img src="/images/banner1.jpg" alt="" /></swiper-slide>
      <swiper-slide><img src="/images/banner2.jpg" alt="" /></swiper-slide>
      <swiper-slide><img src="/images/banner3.jpg" alt="" /></swiper-slide>
      <swiper-slide><img src="/images/banner4.jpg" alt="" /></swiper-slide>

    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination, Navigation, A11y];
</script>

<style scoped lang="less">
.swiperbox {
  margin: 0 auto;
  width: 50%;

  img {
    width: 100%;
  }
}
</style>
