/**
 * Element UI
 * 默认使用中文
 * 官网：https://element.eleme.cn/#/zh-CN
 */

import Vue from 'vue';
import Element from 'element-ui';

// Element 国际化
import zhCN from 'element-ui/lib/locale/lang/zh-CN';
// import en from 'element-ui/lib/locale/lang/en';

// Element 自定义主题
import '@/assets/css/element-variables.scss';

Vue.use(Element, {
  locale: zhCN
});
