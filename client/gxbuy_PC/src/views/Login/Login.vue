<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserStore } from '@/store';
import { userLoginRequest } from '@/api/index';
import { myMessage } from '@/tools/message';
import FormValidate from '@/components/common/FormValidate.vue';

const route = useRoute();
const router = useRouter();
const userStore = UserStore();

const baseURL = ref(
  (import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL) +
    '/v1/user/code/'
);

const codeURL = ref<string>(baseURL.value + '?time=' + new Date());

const loginForm = reactive([
  {
    name: 'user_account',
    type: 'text',
    value: '',
    describe: '账号',
    placeholder: '请输入用户名',
    schema: [{ type: 'notEmpty', errorMessage: '用户名不能为空' }],
  },
  {
    name: 'user_password',
    type: 'password',
    value: '',
    describe: '密码',
    placeholder: '请输入密码',
    schema: [{ type: 'notEmpty', errorMessage: '密码不能为空' }],
  },
  {
    name: 'code',
    type: 'text',
    value: '',
    describe: '验证码',
    placeholder: '请输入验证码',
    withImg: codeURL,
    schema: [{ type: 'notEmpty', errorMessage: '验证码不能为空' }],
  },
]);

async function login(loginInfo: any) {
  try {
    const res = (await userLoginRequest(loginInfo)).data;

    userStore.gxbuy_PC_jwt = res.jwt;
    userStore.userInfo = res.user;

    if (!route.query.toPath) router.push('/home');
    else router.push(route.query.toPath as string);
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage, 'error');
  }
}
</script>

<template>
  <div id="login">
    <div class="pc-center login-container">
      <div class="login-box">
        <FormValidate
          class="form-validate"
          :formData="loginForm"
          :submit-text="'立即登录'"
          @codeImgChange="codeURL = baseURL + '?time=' + new Date()"
          @submit="login"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#login {
  margin-bottom: -50px;
  height: 700px;
  background: url('@/assets/img/common/background_img.jpg') no-repeat;
  background-size: 100% 100%;

  .login-container {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 700px;

    .login-box {
      display: flex;
      align-items: center;
      width: 430px;
      height: 400px;
      background-color: #fff;
      border-radius: 50px;

      .form-validate {
        margin-left: 10px;
      }
    }
  }
}
</style>
