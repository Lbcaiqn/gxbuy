<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Swiper from 'swiper';
import {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  EffectCreative,
  EffectCards,
  HashNavigation,
  History,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
  FreeMode,
  Grid,
  Manipulation,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';

Swiper.use([
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  EffectCreative,
  EffectCards,
  HashNavigation,
  History,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
  FreeMode,
  Grid,
  Manipulation,
]);

interface swiperPropsInterface {
  img?: string[]; // 图片url
  bannerHeight?: number; // 轮播图高度
  loop?: boolean; // 循环轮播
  delay?: number; // 轮播时间
  pagination?: any; // 分页器
  navigation?: boolean; // 前进后退按钮
  slidesPerView?: number; // 每页的图片数
  spaceBetween?: number; // 每页多个图片时，每个图片之间的间距
  effect?: 'slide' | 'fade'; // 切换的动画效果
  speed?: number; // 切换时间
  useZoom?: boolean; // 是否使用放大镜
  thumbs?: boolean; // 是否使用缩略图
  thumbsProps?: swiperPropsInterface; // 缩略图配置
}

const props = withDefaults(defineProps<swiperPropsInterface>(), {
  img: () => [],
  loop: false,
  delay: 2000,
  pagination: () => {
    return { clickable: true, type: 'bullets' };
  },
  navigation: false,
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'slide',
  speed: 500,
  uasZoom: false,
  thumbs: false,
  thumbsProps: () => {
    return {};
  },
});

const thumbsPropsDefault = ref<any>({});

const swiperRef = ref<HTMLElement | null>(null);
const swiperThumbsRef = ref<HTMLElement | null>(null);
const swiper = ref<any>({
  swiper: null,
  swiperThumbs: null,
});

function initSwiper(swiperInstance: any, thumbs: boolean = false) {
  let options: swiperPropsInterface | null = null;
  if (!thumbs) options = props;
  else options = thumbsPropsDefault.value;

  swiper.value[thumbs ? 'swiperThumbs' : 'swiper'] = new Swiper(swiperInstance, {
    loop: options?.loop,
    autoplay: {
      delay: options?.delay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      ...options?.pagination,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: options?.effect,
    speed: options?.speed,
    slidesPerView: options?.slidesPerView,
    spaceBetween: options?.spaceBetween,
    thumbs: {
      swiper: thumbs ? null : swiper.value.swiperThumbs,
    },
  });
}

watch(
  () => props.img,
  async () => {
    await nextTick();
    if (props.thumbs) {
      thumbsPropsDefault.value = Object.assign(
        {
          img: [],
          loop: false,
          delay: 2000,
          pagination: { clickable: true, type: 'bullets' },
          navigation: false,
          slidesPerView: 1,
          spaceBetween: 0,
          activeIndex: 1,
          effect: 'slide',
          speed: 500,
        },
        props.thumbsProps
      );
      await nextTick();
      initSwiper(swiperThumbsRef.value, true);
    }
    initSwiper(swiperRef.value);

    if (swiperRef.value && maskRef.value && bigImgRef.value && bigImgBoxRef.value) {
      imgHeight.value = swiperRef.value.children[0].children[0].children[0].clientHeight;
      imgWidth.value = swiperRef.value.children[0].children[0].children[0].clientWidth;
    }
  }
);

// 放大镜效果
const imgHeight = ref<number>(0);
const imgWidth = ref<number>(0);
const smallImgRef = ref<HTMLElement[] | null>(null);
const maskRef = ref<HTMLElement[] | null>(null);
const bigImgRef = ref<HTMLElement | null>(null);
const bigImgBoxRef = ref<HTMLElement | null>(null);
const currentZoomIndex = ref<number>(0);

function mouseMove(e: MouseEvent, index: number) {
  if (!smallImgRef.value || !maskRef.value || !bigImgRef.value || !bigImgBoxRef.value) return;

  currentZoomIndex.value = index;

  maskRef.value[index].style.height = imgHeight.value / 2 + 'px';
  maskRef.value[index].style.width = imgWidth.value / 2 + 'px';
  bigImgBoxRef.value.style.height = imgHeight.value + 'px';
  bigImgBoxRef.value.style.width = imgWidth.value + 'px';
  bigImgBoxRef.value.style.top = '0';
  bigImgBoxRef.value.style.left = imgWidth.value + 10 + 'px';

  maskRef.value[index].style.display = 'block';
  bigImgBoxRef.value.style.display = 'block';

  let innerX = e.clientX - smallImgRef.value[index].getBoundingClientRect().left;
  let innerY = e.clientY - smallImgRef.value[index].getBoundingClientRect().top;
  let l = innerX - maskRef.value[index].offsetWidth / 2;
  let t = innerY - maskRef.value[index].offsetHeight / 2;

  if (l < 0) l = 0;
  if (t < 0) t = 0;
  if (l > smallImgRef.value[0].offsetWidth - maskRef.value[index].offsetWidth)
    l = smallImgRef.value[0].offsetWidth - maskRef.value[index].offsetWidth;
  if (t > smallImgRef.value[0].offsetHeight - maskRef.value[index].offsetHeight)
    t = smallImgRef.value[0].offsetHeight - maskRef.value[index].offsetHeight;

  maskRef.value[index].style.left = l + 'px';
  maskRef.value[index].style.top = t + 'px';

  bigImgRef.value.style.left =
    -maskRef.value[index].offsetLeft * (bigImgRef.value.offsetWidth / smallImgRef.value[index].offsetWidth) + 'px';
  bigImgRef.value.style.top =
    -maskRef.value[index].offsetTop * (bigImgRef.value.offsetHeight / smallImgRef.value[index].offsetHeight) + 'px';
}

function mouseLeave(index: number) {
  if (!smallImgRef.value || !maskRef.value || !bigImgRef.value || !bigImgBoxRef.value) return;
  maskRef.value[index].style.display = 'none';
  bigImgBoxRef.value.style.display = 'none';
}
</script>

<template>
  <div id="my-swiper">
    <div class="swiper" ref="swiperRef">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(i, iIndex) in img" :key="iIndex">
          <!--  图片懒加载和swiper一起使用可能会出现一个bug 即渲染出空白图,下面是解决方案      -->
          <!-- <img :src="carousel.imageUrl" v-if="index == 0 || index === carouselList.length - 1" /> -->
          <!-- <img v-lazy.container="carousel.imageUrl" alt="" v-else /> -->
          <img
            ref="smallImgRef"
            :src="i"
            :style="{ height: bannerHeight + 'px' }"
            :data-img-index="iIndex"
            @mousemove="mouseMove($event, iIndex)"
          />
          <div
            v-if="useZoom"
            class="mask"
            ref="maskRef"
            :data-mask="true"
            @mousemove="mouseMove($event, iIndex)"
            @mouseleave="mouseLeave(iIndex)"
          ></div>
        </div>
      </div>

      <div class="swiper-pagination" v-if="pagination"></div>

      <div class="swiper-button-prev" v-if="navigation"></div>
      <div class="swiper-button-next" v-if="navigation"></div>

      <!--    <div class="swiper-scrollbar"></div>-->
    </div>

    <div class="swiper" ref="swiperThumbsRef" v-if="thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(i, iIndex) in thumbsPropsDefault?.img" :key="iIndex">
          <!--  图片懒加载和swiper一起使用可能会出现一个bug 即渲染出空白图,下面是解决方案      -->
          <!-- <img :src="carousel.imageUrl" v-if="index == 0 || index === carouselList.length - 1" /> -->
          <!-- <img v-lazy.container="carousel.imageUrl" alt="" v-else /> -->
          <img :src="i" :style="{ height: thumbsPropsDefault?.bannerHeight + 'px' }" />
        </div>
      </div>

      <div class="swiper-pagination" v-if="thumbsPropsDefault?.pagination"></div>

      <div class="swiper-button-prev" v-if="thumbsPropsDefault?.navigation"></div>
      <div class="swiper-button-next" v-if="thumbsPropsDefault?.navigation"></div>

      <!--    <div class="swiper-scrollbar"></div>-->
    </div>

    <div class="big-img-box" ref="bigImgBoxRef" v-if="useZoom && img.length !== 0">
      <img
        ref="bigImgRef"
        :src="img[currentZoomIndex]"
        :style="{position: 'relative', width: '200%', height: bannerHeight! * 2 + 'px' }"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
#my-swiper {
  position: relative;
  img {
    width: 100%;
  }

  .mask {
    display: none;
    position: absolute;
    z-index: 9998;
    cursor: crosshair;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .big-img-box {
    display: none;
    position: absolute;
    z-index: 9998;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }
}
</style>
