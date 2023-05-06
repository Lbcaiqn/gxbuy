<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GoodsList from '@/components/content/GoodsList.vue';
import Pagination from '@/components/common/Pagination.vue';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

// 控制切换商品详情和商品评论 ----------------------------------------------------
const controll = ref<'img' | 'comment'>('img');
const controllerRef = ref<HTMLElement | null>(null);
let controllerRefOffsetTop = ref<number | undefined>(0);

onMounted(() => {
  controllerRefOffsetTop.value = controllerRef.value?.offsetTop! - controllerRef.value?.clientHeight!;
});

function changeControll(type: 'img' | 'comment') {
  controll.value = type;
  if (window.scrollY > controllerRefOffsetTop.value!) window.scrollTo({ top: controllerRefOffsetTop.value });
}

// PROPS 和 emit ------------------------------------------------------------------
const props = withDefaults(
  defineProps<{
    parameter: any[];
    img: any[];
    goodsByShop: [];
    comment: any;
  }>(),
  {
    parameter: () => [],
    img: () => [],
    goodsByShop: () => [],
    comment: () => {},
  }
);
const emit = defineEmits(['currentPage']);

// 格式化sku销售属性 ------------------------------------------------------------------
function skuSalesAttre(index: number) {
  let str = '';
  props.comment?.data[index]?.sku_sales_attrs?.forEach((i: any) => {
    str += i.value + ' ';
  });
  return str;
}

// 分页 ---------------------------------------------------------------------
const current = ref<number>(1);
function currentPage(page: number) {
  current.value = page;
  window.scrollTo({ top: controllerRefOffsetTop.value });
  emit('currentPage', page);
}
</script>

<template>
  <div id="goods-detail">
    <div class="goods-detail-controller" ref="controllerRef">
      <div @click="changeControll('img')" :class="{ active: controll === 'img' }">商品详情</div>
      <div @click="changeControll('comment')" :class="{ active: controll === 'comment' }">商品评价</div>
    </div>

    <div class="goods-detail-content">
      <div class="goods-detail-content-img" v-if="controll === 'img' && img.length !== 0">
        <div class="parameter">
          <div v-for="(i, iIndex) in parameter" :key="iIndex">
            <div>{{ i.name }}：</div>
            <div>{{ i.value }}</div>
          </div>
        </div>
        <div class="img">
          <img v-for="i in img" :src="i.goods_img_url" :key="i._id" />
        </div>
      </div>
      <div class="goods-detail-content-comment" v-else-if="controll === 'comment' && JSON.stringify(comment) !== '{}'">
        <div class="comment-item" v-for="(i, iIndex) in comment.data">
          <div class="comment-title">
            <div class="user-icon"><img :src="baseURL + i.user.user_icon" /></div>
            <div class="user-info">
              <div>{{ i.user.user_name }}</div>
              <div>
                <div>{{ i.add_time }}</div>
                <div>{{ skuSalesAttre(iIndex) }}</div>
              </div>
            </div>
          </div>
          <div class="comment-area">用户未留下评价</div>
        </div>
        <Pagination
          class="pagination"
          :total="Number(comment.total)"
          :pageSize="30"
          :pageNo="current"
          :pager-count="5"
          @currentPage="currentPage"
        />
      </div>
    </div>

    <div class="goods-by-shop" v-if="goodsByShop.length !== 0">
      <div>本店推荐</div>
      <GoodsList :goods="goodsByShop" />
    </div>
  </div>
</template>

<style lang="less" scoped>
#goods-detail {
  margin-top: 50px;
  .goods-detail-controller {
    display: flex;
    position: sticky;
    top: 90px;
    z-index: 9998;
    left: 0;
    height: 60px;
    background-color: #fff;
    border-bottom: 2px solid #fff;

    > div {
      margin: 10px 20px 0 20px;
      width: 130px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
    }

    .active {
      color: red;
      border-bottom: 2px solid red;
    }
  }

  .goods-detail-content {
    margin-top: 20px;
    .goods-detail-content-img {
      margin: 0 auto;
      width: 80%;

      .parameter {
        display: flex;
        flex-wrap: wrap;
        margin: 50px 0 20px 0;

        > div {
          display: flex;
          margin: 8px 0;
          width: 33%;

          > div:first-child {
            margin-right: 5px;
          }
        }
      }

      .img {
        width: 100%;

        img {
          display: block;
          width: 100%;
        }
      }
    }

    .goods-detail-content-comment {
      .comment-item {
        margin: 50px 0;

        .comment-title {
          display: flex;
          align-items: center;
          height: 50px;

          .user-icon {
            margin-left: 10px;
            width: 50px;
            height: 50px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 25px;
            }
          }

          .user-info {
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            > div {
              height: 25px;
              line-height: 25px;
              font-size: 18px;
            }

            > div:nth-child(2) {
              display: flex;

              > div {
                margin-right: 20px;
                font-size: 18px;
              }
            }
          }
        }

        .comment-area {
          margin-top: 20px;
        }
      }
    }
  }

  .goods-by-shop {
    > div:first-child {
      margin: 40px 0 5px 0;
      font-size: 20px;
    }
  }
}
</style>
