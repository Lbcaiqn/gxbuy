<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { MainStore } from '@/store/index';

const router = useRouter();
const mainStore = MainStore();

//搜索业务
let keyword = ref<string>('');
function toSearch() {
  router.push('/Search');
}
</script>

<template>
  <header class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>聚享购欢迎您！</p>
          <p v-if="!mainStore?.user?.nickName">
            <span>请</span>
            <router-link to="/Login">登录</router-link>
            <router-link class="register" to="/Register">注册</router-link>
          </p>
          <p v-else>
            <!-- <a>{{ $store.state.user.nickName }}</a> -->
            <!-- <a class="register" @click="logout">退出登录</a> -->
          </p>
        </div>
        <div class="typeList">
          <!-- <router-link to="/center">我的订单</router-link> -->
          <!-- <router-link to="/shopcart">我的购物车</router-link> -->
          <a href="###">我的聚享购</a>
          <a href="###">聚享购会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注聚享购</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/Home">
          <img src="@/assets/images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<style lang='less' scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
