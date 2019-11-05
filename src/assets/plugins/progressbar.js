/**
 * Progress Bar
 * Github：https://github.com/hilongjw/vue-progressbar
 */

import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
  location: 'top', // 位置
  color: '#1890ff', // 颜色
  failedColor: '#FD5544', // 失败时颜色
  thickness: '4px', // 高度
  transition: {
    speed: '0.4s',
    opacity: '0.6s',
    termination: 400
  },
  autoRevert: true
});
