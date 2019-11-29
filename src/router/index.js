import Vue from 'vue';
import Router from 'vue-router';

// 用户相关页面
import User from './user';
// Home
import Home from './home';
// 错误页面
import error from './error';

Vue.use(Router);

/*
 * 路由属性说明
 *
 * title: 页面title
 * requiresAuth: 是否权限验证，可选值：true | false
 *
 * 示例：
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      requiresAuth: true
    },
    component: () => import('@/views/home/index')
  }
 */

const ROUTER = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    ...User,
    ...Home,
    // 404等错误页面，放在最后！
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

export default ROUTER;
