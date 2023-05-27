import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/home',
    name: 'home',
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
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
  {
    path: '/user_register',
    name: 'user_register',
    component: () => import('@/views/Register/UserRegister.vue'),
    meta: {
      showFooter: true,
      jwt: false,
    },
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/Shopcart/Shopcart.vue'),
    meta: {
      showFooter: true,
      jwt: true,
    },
  },
  {
    path: '/user:feature',
    name: 'user',
    component: () => import('@/views/User/User.vue'),
    meta: {
      showFooter: true,
      jwt: true,
    },
  },
  {
    path: '/order:feature',
    name: 'order',
    component: () => import('@/views/Order/Order.vue'),
    meta: {
      showFooter: true,
      jwt: true,
    },
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: () => import('@/views/Order/ConfirmOrder.vue'),
    meta: {
      showFooter: true,
      jwt: true,
      canFrom: ['login', 'goods', 'shopcart'],
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Order/Pay.vue'),
    meta: {
      showFooter: true,
      jwt: true,
      canFrom: ['login', 'confirmOrder', 'order'],
    },
  },
  {
    path: '/shop:id',
    name: 'shop',
    component: () => import('@/views/Shop/Shop.vue'),
    meta: {
      showFooter: true,
      jwt: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.jwt && !JSON.parse(localStorage.getItem('gxbuy_PC_user_store') || 'null')?.gxbuy_PC_jwt) {
    //如果跳转后的路由需要登录，且此时未登录
    next({
      path: '/login',
      query: { toPath: to.fullPath },
    });
  } else if (to.name === 'login' && JSON.parse(localStorage.getItem('gxbuy_PC_user_store') || 'null')?.gxbuy_PC_jwt) {
    // 如果已登录，就不允许再进入登录页
    next('/home');
  } else {
    // 跳转的目标还是当前路由时的处理，不处理的话页面自跳自己是不会刷新的
    if ((to.name === 'goods' && from.name === 'goods') || (to.name === 'search' && from.name === 'search')) {
      next({ name: 'empty', query: { toPath: to.path, ...to.query } });
    }

    // 如果某个页面只允许在限制的几个页面中跳转过来，且不是本页面自跳，就不允许跳转
    // 例如确认订单页面只允许商品页面和购物车页面跳转而来，在确认订单页面跳转到支付页面后，就不允许从支付页面返回确认订单页面
    else if (to.meta.canFrom && !(to.meta.canFrom as Array<string>)?.includes(from.name as string)) {
      /* 
        这里需要注意，因为刷新页面后，from.nmae 是 undefined，但是事实上我们刷新页面
        也是需要警进行跳转的，所以这里需要判断 from.name 是否为undedined，如果是则精选跳转
        所以路由配置中所有的路由都要给name，才能判断是否是刷新页面
        可能有其他方法解决，但没找到
        */
      if (from.name) next(false);
      else next();
    } else next();
  }
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
