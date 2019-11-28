import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

/**
 * Element UI
 *
 * 不使用 Element UI，注释即可
 */
import '@/assets/plugins/element';
// Progress Bar
import '@/assets/plugins/progressbar';
// svg图标，可配合 iconfont等 网站使用
import '@/assets/icons';
// 权限控制
import '@/assets/utils/auth';

// 全局样式
import '@/assets/css/app.scss';

// 国际化
// import i18n from '@/assets/plugins/lang/index';

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App)
}).$mount('#app');
