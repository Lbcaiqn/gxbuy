<script setup lang="ts">
import { ref } from 'vue';

const baseURL = ref(
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL
);

withDefaults(
  defineProps<{
    goods: {
      time: string | null;
      goods: any;
    }[];
    showShopInfo?: boolean;
    byTime?: boolean;
    showDelete?: boolean;
    deleteText?: string;
  }>(),
  {
    goods: () => {
      return [
        {
          time: null,
          goods: () => [],
        },
      ];
    },
    showShopInfo: false,
    byTime: false,
    showDelete: false,
    deleteText: '删除',
  }
);

const emit = defineEmits(['deleteClick']);

const deleteCurrentTime = ref<number>(-1);
const deleteCurrentItem = ref<number>(-1);

function mouseoverBox(tIndex: number, iIndex: number) {
  deleteCurrentTime.value = tIndex;
  deleteCurrentItem.value = iIndex;
}

function mouseleaveBox() {
  deleteCurrentTime.value = -1;
  deleteCurrentItem.value = -1;
}

function deleteClick(tIndex: number, iIndex: number) {
  emit('deleteClick', {
    tIndex,
    iIndex,
  });
}
</script>

<template>
  <div id="goods-list" v-if="goods.length !== 0">
    <div class="goods" v-for="(t, tIndex) in goods">
      <div class="goods-time" v-if="byTime">{{ t.time }}</div>
      <div class="goods-big-box">
        <div
          class="goods-item"
          v-for="(i, iIndex) in t.goods"
          :key="iIndex"
          @mouseover="mouseoverBox(tIndex, iIndex)"
          @mouseleave="mouseleaveBox"
        >
          <div class="goods-item-box" @click="$router.push('/goods' + i._id)">
            <div class="goods-item-img">
              <el-image :src="i.goods_spu_main_img" :fit="'fill'" lazy />
            </div>
            <div class="goods-item-content">
              <div class="goods-name">{{ i.goods_spu_name }}</div>
              <div class="goods-price">
                <div>￥{{ i.goods_first_sku_price }}</div>
                <div>广东 深圳</div>
              </div>
              <div class="goods-num">
                <div>销量 {{ i.goods_sku_total_sales }}</div>
                <div>收藏 {{ i.goods_spu_total_favorite }}</div>
              </div>
              <div class="goods-shop" v-if="showShopInfo">
                <div>
                  <el-image :src="baseURL + i.shop.shop_logo" lazy />
                </div>
                <div>{{ i.shop.shop_name }}</div>
              </div>
            </div>
          </div>
          <div
            class="delete-btn"
            v-if="showDelete"
            v-show="deleteCurrentTime === tIndex && deleteCurrentItem === iIndex"
            @click="deleteClick(tIndex, iIndex)"
          >
            {{ deleteText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#goods-list {
  .goods {
    .goods-time {
      height: 80px;
      line-height: 95px;
      font-size: 35px;
      border-bottom: 2px solid @main-color;
    }

    .goods-big-box {
      display: flex;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;

      .goods-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 20%;

        .goods-item-box {
          display: flex;
          justify-content: top;
          align-items: center;
          flex-direction: column;
          margin: 8px 0;
          width: 95%;
          cursor: pointer;
          border: 2px solid @main-color;
          border-radius: 20px;

          .goods-item-img {
            width: 100%;
            height: 226px;

            :deep(img) {
              border-radius: 20px;
            }
          }

          .goods-item-content {
            margin-top: 12px;
            width: 88%;

            .goods-name {
              height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .goods-price {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 3px;

              > div:first-child {
                font-weight: bold;
                font-size: 22px;
                color: red;
              }
            }

            .goods-num {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 5px 0 10px 0;
              font-size: 12px;
              color: gray;
            }

            .goods-shop {
              display: flex;
              justify-content: left;
              align-items: center;
              margin: 10px 0;

              > div {
                height: 15px;
                line-height: 15px;
              }

              > div:first-child {
                margin-right: 10px;
                width: 15px;

                :deep(img) {
                  width: 100%;
                  height: 100%;
                  border-radius: 7.5px;
                }
              }
            }
          }
        }

        .delete-btn {
          position: absolute;
          left: 50%;
          bottom: 10px;
          margin-left: -110px;
          width: 220px;
          height: 90px;
          line-height: 92px;
          text-align: center;
          font-size: 25px;
          cursor: pointer;
          color: #fff;
          background-color: red;
          border-top: 2px solid red;
          border-radius: 0 0 20px 20px;
        }
      }
    }
  }
}
</style>
