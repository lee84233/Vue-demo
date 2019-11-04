import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

// 用户相关页面
import User from './user';
// Home
import Home from './home';
// 错误页面
import error from './error';

Vue.use(Router);

let ROUTER = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'login'}
    },
    ...User,
    ...Home,
    // 404, 500等错误页面，放在最后
    ...error
  ],
  // 滚动行为
  // 只在支持 history.pushState 的浏览器中可用
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

// 路由导航守卫
ROUTER.beforeEach((to, from, next) => {
  // 设置页面 title
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${process.env.VUE_APP_NAME}`;
  } else {
    // 默认项目名称
    document.title = process.env.VUE_APP_NAME;
  }
  // 设置页面权限
  if (to.meta.requiresAuth === true) {
    if (store.state.token) {
      next();
    } else {
      next({path: '/404'});
    }
  } else {
    next();
  }
});

export default ROUTER;
