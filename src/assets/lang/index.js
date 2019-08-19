/*
 * 国际化
 * @Author: Bruce.Lee
 * @Date: 2018-03-02 22:24:47
 * @Last Modified by: Bruce.Lee
 * @Last Modified time: 2019-06-24 17:24:18
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store/index';
// 语言包
import zh from './zh'; // 中文
import en from './en'; // 英文

Vue.use(VueI18n);
export default new VueI18n({
  locale: store.state.lang, // 语言，在页面中切换locale的值实现语言切换：this.$i18n.localse = 'en'
  fallbackLocale: 'zh', // 预设语言
  messages: {
    zh,
    en
  }
});
