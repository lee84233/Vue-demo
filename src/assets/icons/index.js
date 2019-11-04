import Vue from 'vue';
// svg 组件
import SvgIcon from '@/components/SvgIcon';

// 注册为全局组件
Vue.component('svg-icon', SvgIcon);

// 获取 ./svg 目录文件
let files = require.context('./svg', false, /\.svg$/);

(files => files.keys().map(files))(files);
