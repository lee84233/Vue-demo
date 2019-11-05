/*
 * 权限控制
 *
 * @Author: Lee
 * @Date: 2019-11-05
 */

import router from '@/router/index';
import store from '@/store/index';

router.beforeEach((to, from, next) => {
  // app.$Progress.start();

  // 设置页面 title
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${process.env.VUE_APP_NAME}`;
  } else {
    document.title = process.env.VUE_APP_NAME;
  }

  // 判断页面权限
  if (to.meta.requiresAuth === true) {
    if (store.state.token) {
      next();
    } else {
      // 无token，跳转到登录页
      next({
        name: 'login',
        query: {
          redirect: to.path
        }
      });
      // app.$Progress.fail();
    }
  } else {
    next();
  }
});

// router.afterEach(() => {
//   app.$Progress.finish();
// });
