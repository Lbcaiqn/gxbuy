<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { getGoodsByFeatureRequest } from '@/api';
import EventBus from '@/EventBus';
import GoodsList from '@/components/content/GoodsList.vue';

const homeData = reactive<any>({
  feature: {
    hot: [],
    new: [],
    pop: [],
  },
  pages: {
    hot: 1,
    new: 1,
    pop: 1,
  },
});

async function getGoodsByFeature(feature: 'hot' | 'new' | 'pop', pageSize: number, page: number) {
  homeData.feature[feature] = [
    ...homeData.feature[feature],
    ...(await getGoodsByFeatureRequest(feature, pageSize, page)).data,
  ];
}

getGoodsByFeature('hot', 30, 1);
getGoodsByFeature('new', 30, 1);
getGoodsByFeature('pop', 30, 1);

let current = ref<'hot' | 'new' | 'pop'>('hot');
const controllerRef = ref<HTMLElement | null>(null);
let controllerRefOffsetTop = ref<number | undefined>(0);

onMounted(() => {
  EventBus.on('imgLoadFinish', getControllerOffsetTop);
});

function getControllerOffsetTop() {
  controllerRefOffsetTop.value = controllerRef.value?.offsetTop! - controllerRef.value?.clientHeight!;
}

function changeControll(type: 'hot' | 'new' | 'pop') {
  current.value = type;
  if (window.scrollY > controllerRefOffsetTop.value!) window.scrollTo({ top: controllerRefOffsetTop.value });
}
// 上拉加载更多
function pullUpload() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (Math.ceil(scrolled) === scrollable && homeData.pages[current.value] < 5) {
    getGoodsByFeature(current.value, 30, ++homeData.pages[current.value]);
  }
}

window.addEventListener('scroll', pullUpload);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', pullUpload);
  EventBus.off('imgLoadFinish', getControllerOffsetTop);
});
</script>

<template>
  <div id="home-feature">
    <div class="controller" ref="controllerRef">
      <div :class="{ active: current == 'hot' }" @click="changeControll('hot')">热门</div>
      <div :class="{ active: current == 'new' }" @click="changeControll('new')">新品</div>
      <div :class="{ active: current == 'pop' }" @click="changeControll('pop')">流行</div>
    </div>
    <div class="goods-list">
      <GoodsList :goods="homeData.feature[current]" :showShopInfo="true" />
    </div>
  </div>
</template>

<style lang="less" scoped>
#home-feature {
  margin-top: 40px;

  .controller {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 90px;
    z-index: 9998;
    height: 60px;
    background-color: #000;
    border-bottom: 2px solid #000;

    > div {
      margin: 0 100px 0 100px;
      width: 150px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      cursor: pointer;
    }

    .active {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>
