<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore } from '@/store';
import { getUserRecordRequest, deleteSearchHistorySingleRequest, deleteSearchHistoryAllRequest } from '@/api';
import { myMessage } from '@/tools/message';

const router = useRouter();
const userStore = UserStore();

const searchInputRef = ref<HTMLElement | null>(null);
const keyword = ref<string>('');

function logout() {
  userStore.gxbuy_PC_jwt = '';
  userStore.userInfo = {};
}

function toSearch() {
  if (!keyword.value) return;

  showSearchDrop.value = false;
  searchInputRef.value?.blur();

  router.push({
    path: './search',
    query: {
      keyword: keyword.value,
    },
  });
}

function backHome() {
  router.push('/home');
  window.scrollTo({ top: 0 });
}

// 搜索记录 ---------------------------------------------------------------
const showSearchDrop = ref<boolean>(false);
const tagCurrent = ref<number>(-1);
const keywords = ref<any>([]);

async function searchFocus() {
  showSearchDrop.value = true;

  if (!userStore.gxbuy_PC_jwt) return;
  try {
    keywords.value = (await getUserRecordRequest({ feature: 'search_history', pageSize: 30, page: 1 })).data;
  } catch (err: any) {
    myMessage(err?.response ? '网络异常' : '请重新登录', 'error');
  }
}

function searchBlur() {
  setTimeout(() => {
    showSearchDrop.value = false;
  }, 100);
}

function mouseoverTag(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (!target.dataset.index) tagCurrent.value = -1;
  else tagCurrent.value = Number(target.dataset.index);
}

function mouseleaveTag() {
  tagCurrent.value = -1;
}

async function clickTag(e: MouseEvent) {
  const target = e.target as HTMLElement;

  tagCurrent.value = -1;

  if (target.dataset.keyword) {
    keyword.value = target.dataset.keyword;
    toSearch();
  } else if (target.dataset.deleteId) {
    try {
      await deleteSearchHistorySingleRequest(target.dataset.deleteId);
    } catch (err: any) {
      myMessage(err?.response ? '网络异常' : '请重新登录', 'error');
    }
  }
}

async function deleteSearchHistoryAll() {
  try {
    await deleteSearchHistoryAllRequest();
  } catch (err: any) {
    myMessage(err?.response ? '网络异常' : '请重新登录', 'error');
  }
}
</script>

<template>
  <div id="pc-header">
    <div class="topper">
      <div class="pc-center">
        <div class="left" v-if="!userStore.gxbuy_PC_jwt">
          <span>欢迎来到聚享购！</span>
          <span @click="$router.push('/login')">登录</span>
          <span @click="$router.push('/user_register')">注册</span>
          <span @click="$router.push('/shop_register')">开店</span>
        </div>
        <div class="left" v-else>
          <span>欢迎来到聚享购！ {{ userStore.userInfo.user_name }}</span>
          <span>个人中心</span>
          <span>我的订单</span>
          <span @click="$router.push('/shopcart')">我的购物车</span>
        </div>
        <div class="right" v-if="userStore.gxbuy_PC_jwt">
          <span></span>
          <span @click="logout">退出登录</span>
        </div>
      </div>
    </div>

    <div class="searcher">
      <div class="pc-center">
        <div class="logo" @click="backHome">聚享购</div>
        <div class="search">
          <div class="search-inp">
            <input
              type="text"
              ref="searchInputRef"
              v-model="keyword"
              @keydown.enter="toSearch"
              @focus="searchFocus"
              @blur="searchBlur"
            />
          </div>
          <div class="search-btn" @click="toSearch">搜索</div>
          <div class="search-drop" v-show="showSearchDrop">
            <div class="title">
              <span>搜索记录</span>
              <span><i class="iconfont icon-lajitong" @click="deleteSearchHistoryAll"></i></span>
            </div>
            <div class="content" @click="clickTag" @mouseover="mouseoverTag" @mouseleave="mouseleaveTag">
              <div
                class="content-item"
                v-for="(i, iIndex) in keywords.data"
                :key="i._id"
                :data-index="iIndex"
                :data-keyword="i.keyword"
              >
                <span :data-index="iIndex" :data-keyword="i.keyword">{{ i.keyword }}</span>
                <div class="delete" v-show="tagCurrent === iIndex" :data-index="iIndex" :data-delete-id="i._id">×</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

#pc-header {
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: #fff;
  .topper {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #fff;
    .pc-center {
      display: flex;
      justify-content: space-between;

      span {
        margin: 0 7px;
        cursor: pointer;
      }

      span:first-child {
        cursor: auto;
      }
    }
  }
  .searcher {
    padding: 10px 0;
    border-bottom: 2px solid @main-color;

    .pc-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        width: 180px;
        height: 40px;
        line-height: 38px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
        color: @main-color;
        border: 1px solid #fff;
      }
      .search {
        display: flex;
        justify-content: space-between;

        .search-inp {
          input {
            margin-right: 20px;
            padding: 0 15px;
            width: 800px;
            height: 30px;
            border: 2px solid @main-color;
            border-radius: 10px;
          }
        }
        .search-btn {
          border: 1px solid @main-color;
          width: 80px;
          height: 30px;
          line-height: 28px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          background-color: @main-color;
          border-radius: 10px;
        }

        .search-drop {
          position: absolute;
          top: 75px;
          padding: 15px;
          width: 800px;
          background-color: #fff;

          .title {
            display: flex;
            margin-left: 15px;
            margin-bottom: 15px;

            > span {
              font-size: 20px;
            }

            > span:nth-child(2) {
              margin-left: 10px;
            }
          }

          .content {
            display: flex;
            flex-wrap: wrap;
            font-size: 18px;

            .content-item {
              position: relative;
              margin: 0 15px 15px 15px;
              padding: 0 25px;
              height: 40px;
              line-height: 38px;
              text-align: center;
              cursor: pointer;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              background-color: rgba(127, 127, 127, 0.5);
              border: 1px solid rgba(127, 127, 127, 0.5);
              border-radius: 10px;

              .delete {
                position: absolute;
                top: 5.5px;
                right: 15px;
                width: 5px;
                height: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
