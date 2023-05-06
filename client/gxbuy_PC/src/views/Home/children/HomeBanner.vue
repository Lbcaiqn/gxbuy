<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import MySwiper from '@/components/common/MySwiper.vue';
import { getCategoryDataRequest, getBannerDataRequest } from '@/api';
import { throttle } from '@/tools/lodash';

const router = useRouter();

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

// 数据
const homeData = reactive<any>({
  category: [],
  banner: [],
});

async function getCategoryData() {
  homeData.category = (await getCategoryDataRequest()).data;
}

async function getBannerData() {
  homeData.banner = (await getBannerDataRequest()).data;
}

getCategoryData();
getBannerData();

// 切换分类
const categoryCurrent = ref<number>(0);
const detailCategoryRef = ref<HTMLElement | null>(null);
const flag = ref(true);

const categoryAlter = throttle(async function (e: MouseEvent) {
  if (!flag.value) return;
  if (!(e.target as HTMLElement).dataset.index) return;

  const index = Number((e.target as HTMLElement).dataset.index);
  categoryCurrent.value = index;
  await nextTick();

  if (detailCategoryRef.value) {
    detailCategoryRef.value.style.height = 'auto';
    detailCategoryRef.value.style.display = 'block';
    if (detailCategoryRef.value.clientHeight <= 444) detailCategoryRef.value.style.height = '444px';
  }
}, 50);

// 使用节流后，由于有延迟，使得会在延迟再执行categoryAlter，所以离开的时候也要延迟一下
const categoryAlterLeave = () => {
  detailCategoryRef.value!.style.display = 'none';
  flag.value = false;
  setTimeout(() => {
    flag.value = true;
  }, 50);
};

// 搜索
function toSearch(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.dataset.level) return;

  const query: any = {};
  query[target.dataset.level] = target.dataset.cid;
  router.push({
    path: '/search',
    query,
  });
}
</script>

<template>
  <div id="home-banner" class="pc-center">
    <div class="left" @mouseover="categoryAlter($event)" @mouseleave="categoryAlterLeave" @click="toSearch">
      <div class="left-item" v-for="(i, iIndex) in homeData.category" :key="i._id" :data-index="iIndex">
        <span :data-index="iIndex" data-level="c1id" :data-cid="i._id">{{ i.cat_name }}</span>
      </div>
    </div>
    <div class="mid">
      <MySwiper
        :img="
          homeData.banner.map((i: any) => baseURL + i.img)
        "
        :banner-height="444"
        :loop="true"
        :delay="3500"
        :navigation="true"
        :thumbs="true"
      />
    </div>
    <div class="right">
      <div class="user-info">
        <div class="user-img"><img src="/none/none_user.jpg" /></div>
        <div class="user-name">Hi，欢迎！</div>
      </div>
      <div class="user-option">
        <div class="user-option-btn">登录</div>
        <div class="user-option-btn">注册</div>
        <div class="user-option-btn">开店</div>
      </div>
    </div>
    <div
      class="detail"
      ref="detailCategoryRef"
      @mouseover="detailCategoryRef!.style.display = 'block'"
      @mouseleave="detailCategoryRef!.style.display = 'none'"
      @click="toSearch"
    >
      <div class="two" v-for="two in homeData.category[categoryCurrent]?.children" :key="two._id">
        <div class="two-title">
          <span data-level="c2id" :data-cid="two._id">{{ two.cat_name }}</span>
        </div>
        <div class="three">
          <span v-for="three in two?.children" :key="three._id" data-level="c3id" :data-cid="three._id">
            {{ three?.cat_name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#home-banner {
  border: 1px solid #fff;
  display: flex;
  position: relative;
  height: 444px;
  .left {
    overflow: scroll;
    width: 15%;
    .left-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      margin-left: 5px;
      width: 100%;
      font-size: 17px;

      span {
        cursor: pointer;
      }

      &::after {
        content: '>';
        margin-right: 20px;
      }
    }
  }
  .mid {
    width: 60%;
  }
  .right {
    width: 25%;

    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 80px;
      width: 100%;
      height: 40%;
      .user-img {
        width: 100px;
        height: 100px;

        img {
          width: 100%;
          border-radius: 50px;
          border: 2px solid #000;
        }
      }

      .user-name {
        margin-top: 40px;
        font-size: 25px;
      }
    }

    .user-option {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40%;

      .user-option-btn {
        margin: 0 8px;
        width: 70px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        border: 2px solid #000;
        border-radius: 10px;
      }
    }
  }
  .detail {
    display: none;
    position: absolute;
    top: 0;
    left: 15%;
    width: 60%;
    z-index: 999;
    background-color: #000;
    color: #fff;

    .two {
      display: flex;
      margin: 10px 0 0 10px;
      .two-title {
        margin-right: 15px;
        width: 13%;

        span {
          cursor: pointer;
        }
      }
      .three {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        width: 87%;

        span {
          margin: 0 10px 10px 0;
          padding-left: 10px;
          cursor: pointer;
          border-left: 2px solid #000;
        }
      }
    }
  }
}
</style>
