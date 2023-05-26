<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';

interface formInterface {
  name: string;
  type: 'text' | 'password' | 'radio' | 'checkbox' | string;
  value: string | string[] | boolean;
  describe?: string;
  placeholder?: string;
  text?: string;
  withImg?: string;
  items?: {
    value: string | boolean;
    text?: string;
  }[];
  schema?: {
    type: 'notEmpty' | 'reg' | 'same' | string;
    reg?: RegExp[];
    sameName?: string;
    errorMessage: string;
  }[];
}

const props = withDefaults(
  defineProps<{
    formData: formInterface[];
    submitText?: string;
  }>(),
  {
    formData: () => [],
    submitText: '提交',
  }
);

const emit = defineEmits(['codeImgChange', 'submit']);

// // formData 例子
// const data: formInterface[] = ref([
//   {
//     name: 'account',
//     type: 'text',
//     describe: '用户名',
//     placeholder: '请输入用户名',
//     value: '',
//     schema: [{ type: 'notEmpty', errorMessage: '用户名不能为空' }],
//   },
//   {
//     name: 'password',
//     type: 'password',
//     describe: '密码',
//     placeholder: '请输入密码',
//     value: '',
//     schema: [
//       { type: 'notEmpty', errorMessage: '密码不能为空' },
//       {
//         type: 'reg',
//         reg: [/[a-zA-Z0-9]{6,24}/, /[A-Z]/, /[0-9]/],
//         errorMessage: '密码必须是6-24位，由数字和英文字母组成，且必须包含数字和大写字母',
//       },
//     ],
//   },
//   {
//     name: 'passwordConfirm',
//     type: 'password',
//     describe: '确认密码',
//     placeholder: '请输入确认密码',
//     value: '',
//     schema: [
//       { type: 'notEmpty', errorMessage: '确认密码不能为空' },
//       {
//         type: 'reg',
//         reg: [/[a-zA-Z0-9]{6,24}/, /[A-Z]/, /[0-9]/],
//         errorMessage: '密码必须是6-24位，由数字和英文字母组成，且必须包含数字和大写字母',
//       },
//       { type: 'same', sameName: 'password', errorMessage: '密码和确认密码不一致' },
//     ],
//   },
//   {
//     name: 'sex',
//     type: 'radio',
//     describe: '性别',
//     value: 'female',
//     items: [
//       { value: 'male', text: '男' },
//       { value: 'female', text: '女' },
//     ],
//     schema: [{ type: 'notEmpty', errorMessage: '请勾选性别' }],
//   },
//   {
//     name: 'hobbit',
//     type: 'checkbox',
//     describe: '爱好',
//     value: ['opt1'],
//     items: [
//       { value: 'opt1', text: '多选1' },
//       { value: 'opt2', text: '多选2' },
//       { value: 'opt3', text: '多选3' },
//       { value: 'opt4', text: '多选4' },
//     ],
//     schema: [{ type: 'notEmpty', errorMessage: '请勾选兴趣' }],
//   },
//   {
//     name: 'code',
//     type: 'text',
//     describe: '验证码',
//     placeholder: '',
//     value: '',
//     withImg: 'imgurl',
//     schema: [{ type: 'notEmpty', errorMessage: '验证码不能为空' }],
//   },
//   {
//     name: 'agree',
//     type: 'checkbox',
//     text: `我同意<a href="#">xxx协议</a>`,
//     value: false,
//     items: [{ value: true, text: `我同意<a href="#"a>xxx选项</a>` }],
//     schema: [{ type: 'notEmpty', errorMessage: '请同意协议' }],
//   },
// ]);

//校验规则
function schema(value: string, form: any) {
  const formItem = props.formData.find(i => i.name === form.field);
  if (!formItem || !formItem.schema) return true;

  for (let i of formItem.schema) {
    switch (i.type) {
      case 'notEmpty':
        if (!value || value?.length === 0) return i.errorMessage;
        break;
      case 'reg':
        if (!i.reg!.every(r => r.test(value))) return i.errorMessage;
        break;
      case 'same':
        if (value !== props.formData.find((item: formInterface) => item.name === i.sameName)?.value)
          return i.errorMessage;
        break;
      default:
        break;
    }
  }

  return true;
}

// 使用校验规则
const mySchema = ref<any>({});
for (let i of props.formData) mySchema.value[i.name] = schema;

// 提交
function submit(data: any) {
  emit('submit', data);
}
</script>

<template>
  <Form
    id="form-validate"
    v-if="formData.length !== 0"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    @submit="submit"
  >
    <div v-for="i in formData" :key="i.name">
      <div class="form-item" :style="{ 'margin-bottom': errors[i.name] ? 0 : '35px' }">
        <!-- 表头 -->
        <div class="describe">
          <span>{{ i.describe }}</span>
          <span>{{ i.describe ? '：' : ' ' }}</span>
        </div>

        <!-- 输入框 -->
        <div
          class="form-item-type form-item-type-text"
          :class="{ 'with-img': i.withImg }"
          v-if="['text', 'password', 'email'].includes(i.type)"
        >
          <Field v-model="i.value" :name="i.name" :type="i.type" :placeholder="i.placeholder" :validateOnInput="true" />
          <img class="code" v-if="i.withImg" :src="i.withImg" @click="$emit('codeImgChange')" />
        </div>

        <!-- 单选、多选 -->
        <div class="form-item-type form-item-type-options" v-else-if="['radio', 'checkbox'].includes(i.type)">
          <label v-for="(item, itemIndex) in i.items" :key="itemIndex">
            <div class="options-box">
              <div>
                <Field v-model="i.value" :value="item.value" :name="i.name" :type="i.type" :validateOnInput="true" />
              </div>
              <div v-html="item.text"></div>
            </div>
          </label>
        </div>
      </div>

      <!-- 错误提示 -->
      <div class="error-message" v-if="errors[i.name]">
        <span class="describe"></span>
        <span>{{ errors[i.name] }}</span>
      </div>
    </div>

    <div class="form-item">
      <div class="form-submit">
        <button type="submit">{{ submitText }}</button>
      </div>
    </div>
  </Form>
</template>

<style lang="less" scoped>
@common-height: 30px;

#form-validate {
  .form-item {
    display: flex;
    height: @common-height;

    .describe {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: @common-height;
      line-height: @common-height;

      span {
        width: 20px;
        text-align: right;
        font-size: 17px;
      }

      span:first-child {
        width: 80px;
      }
    }

    .form-item-type {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .form-item-type-text {
      input {
        padding: 0 10px;
        width: 250px;
        height: @common-height;
        font-size: 17px;
      }
    }

    .with-img {
      input {
        width: 100px;
      }

      .code {
        margin-left: 30px;
        height: @common-height;
      }
    }

    .form-item-type-options {
      display: flex;
      align-items: center;
      .options-box {
        display: flex;
        align-items: center;
        margin-right: 30px;

        > div {
          margin-right: 8px;
          height: @common-height;
          line-height: @common-height;
          font-size: 17px;
        }
      }
    }
  }

  .error-message {
    margin: 5px 0 10px 110px;
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 12px;
  }

  .form-submit {
    margin-left: 100px;
    width: 270px;
    height: 33px;

    button {
      width: 100%;
      height: 100%;
      font-size: 18px;
      border-radius: 10px;
    }
  }
}
</style>
