import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import VueProgressBar from 'vue-progressbar';
// i18n国际化
import i18n from '@/assets/lang/index';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  location: 'top',
  color: '#1890ff',
  failedColor: '#FD5544',
  thickness: '4px',
  transition: {
    speed: '0.4s',
    opacity: '0.6s',
    termination: 400
  },
  autoRevert: true
});

export default new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
