<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const keyword = ref<string>('');

function toSearch() {
  if (!keyword.value) return;

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
</script>

<template>
  <div id="pc-header">
    <div class="topper">
      <div class="pc-center">
        <div class="left">
          <span>欢迎来到聚享购！ 请</span>
          <span>登录</span>
          <span>注册</span>
          <span>开店</span>
        </div>
        <div class="right">
          <span></span>
          <span>我的订单</span>
          <span>我的购物车</span>
        </div>
      </div>
    </div>

    <div class="searcher">
      <div class="pc-center">
        <div class="logo" @click="backHome">聚享购</div>
        <div class="search">
          <div class="search-inp"><input type="text" v-model="keyword" @keydown.enter="toSearch" /></div>
          <div class="search-btn" @click="toSearch">搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#pc-header {
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: #fff;
  .topper {
    height: 30px;
    line-height: 30px;
    border: 1px solid #fff;
    .pc-center {
      display: flex;
      justify-content: space-between;

      span {
        margin: 0 3px;
        cursor: pointer;
      }

      span:first-child {
        cursor: auto;
      }
    }
  }
  .searcher {
    padding: 10px 0;
    border-bottom: 1px solid #fff;

    .pc-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        width: 180px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid #fff;
      }
      .search {
        display: flex;
        padding-right: 100px;
        .search-inp {
          input {
            margin-right: 20px;
            width: 700px;
            height: 30px;
          }
        }
        .search-btn {
          border: 1px solid #fff;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
