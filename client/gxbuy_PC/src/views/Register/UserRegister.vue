<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { UserStore } from '@/store';
import { userRegisterRequest } from '@/api/index';
import { myMessage } from '@/tools/message';
import FormValidate from '@/components/common/FormValidate.vue';

const router = useRouter();
const userStore = UserStore();

const baseURL = ref(
  (import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASEURL : import.meta.env.VITE_PROD_BASEURL) +
    '/v1/user/code/'
);

const codeURL = ref<string>(baseURL.value + '?time=' + new Date());

const registerForm = reactive([
  {
    name: 'user_account',
    type: 'text',
    value: '',
    describe: '账号',
    placeholder: '请输入用户名',
    schema: [
      { type: 'notEmpty', errorMessage: '用户名不能为空' },
      { type: 'reg', reg: [/^.{8,50}$/], errorMessage: '账号必须是8到50个字符' },
    ],
  },
  {
    name: 'user_name',
    type: 'text',
    value: '',
    describe: '昵称',
    placeholder: '请输入昵称',
    schema: [
      { type: 'notEmpty', errorMessage: '用户名不能为空' },
      { type: 'reg', reg: [/^.{2,30}$/], errorMessage: '昵称必须是2到30个字符' },
    ],
  },
  {
    name: 'user_password',
    type: 'password',
    value: '',
    describe: '密码',
    placeholder: '请输入密码',
    schema: [
      { type: 'notEmpty', errorMessage: '用户名不能为空' },
      {
        type: 'reg',
        reg: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/],
        errorMessage: '密码必须是8到30位，至少一个字母，至少一个数字',
      },
    ],
  },
  {
    name: 'user_password_comfirm',
    type: 'password',
    value: '',
    describe: '确认密码',
    placeholder: '请输入确认密码',
    schema: [
      { type: 'notEmpty', errorMessage: '用户名不能为空' },
      { type: 'same', sameName: 'user_password', errorMessage: '两次密码不一致' },
    ],
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

async function register(registerInfo: any) {
  delete registerInfo.user_password_comfirm;

  try {
    const res = (await userRegisterRequest(registerInfo)).data;

    userStore.gxbuy_PC_jwt = res.jwt;
    userStore.userInfo = res.newUser;

    router.push('/home');
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
          :formData="registerForm"
          :submitText="'注册'"
          @codeImgChange="codeURL = baseURL + '?time=' + new Date()"
          @submit="register"
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
    justify-content: center;
    align-items: center;
    height: 700px;

    .login-box {
      display: flex;
      align-items: center;
      width: 800px;
      height: 550px;
      background-color: #fff;
      border-radius: 50px;

      .form-validate {
        margin-left: 180px;
      }
    }
  }
}
</style>
