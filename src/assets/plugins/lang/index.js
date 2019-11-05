/*
 * 国际化插件
 * 文档：https://kazupon.github.io/vue-i18n/
 *
 * @Author: Lee
 * @Date: 2018-03-02 22:24:47
 * @Last Modified by: Lee
 * @Last Modified time: 2019-06-24 17:24:18
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store/index';
// 语言包
import zh from './zh'; // 中文
import en from './en'; // 英文

Vue.use(VueI18n);

const I18N = new VueI18n({
  // 设置语言
  // 在页面中切换locale的值实现语言切换：this.$i18n.localse = 'en'
  locale: store.state.lang,
  // 预设语言
  fallbackLocale: 'zh',
  // 语言信息
  messages: {
    zh,
    en
  }
});

export default I18N;
