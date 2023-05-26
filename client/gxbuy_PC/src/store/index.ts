import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export const MainStore = defineStore('MainStore', {
  state() {
    return {};
  },
  getters: {},
  actions: {},
});

export const UserStore = defineStore('UserStore', {
  state() {
    return {
      gxbuy_PC_jwt: '',
      userInfo: {} as any,
    };
  },
  persist: {
    key: 'gxbuy_PC_user_store',
    storage: window.localStorage,
  },
  getters: {},
  actions: {},
});

export default pinia;
