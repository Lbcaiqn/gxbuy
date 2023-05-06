import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/Search.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
  {
    path: '/goods:id',
    name: 'goods',
    component: () => import('@/views/Goods/Goods.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('@/views/Empty/Empty.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === 'goods' && from.name === 'goods') || (to.name === 'search' && from.name === 'search')) {
    next({ name: 'empty', query: { toPath: to.path, ...to.query } });
  } else next();
});

router.afterEach(to => {
  if (to.name === 'empty') {
    router.push({
      path: to.query.toPath as string,
      query: to.query,
    });
  }
});

export default router;
