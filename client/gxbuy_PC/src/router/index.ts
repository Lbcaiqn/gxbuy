import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/Search',
    component: () => import('@/views/Search/Search.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      showFooter: false
    }
  },
  {
    path: '/Register',
    component: () => import('@/views/Register/Register.vue'),
    meta: {
      showFooter: false
    }
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),  
  routes
})

export default router