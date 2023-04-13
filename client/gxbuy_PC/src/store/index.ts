import {createPinia,defineStore} from 'pinia'
const pinia = createPinia()

const MainStore = defineStore('Main',{
  state(){
    return {
      user: {
        nickName: ''
      }
    }
  },
  getters: {
    //功能类似于计算属性，也有缓存
    //通过this可调用state，getters
    // phoneNumberHide(){
      // return this.phoneNumber.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
      // 使用ts时，ts无法根据return自动判断类型，所以需要自行设置返回类型，如 xxx
    // }  
  },
  actions: {
    //可定义同步/异步函数
    // xxx(){
      //通过this调用store自己的state，actions，getters
      // this.aaa += 10
    // }  
  }
})

export {
  pinia,
  MainStore
}