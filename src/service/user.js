import axios from 'axios';
import SendHttp from '@/assets/utils/request-base';

// 接口1
export function switchLanguage(data) {
  return SendHttp({
    url: 'switchLanguage.php', // 接口相对地址，必填
    method: 'post', // 请求方式，选填，默认值：get，可选值：get | post | put | delete
    data, // 入参，选填，默认：{}
    dataType: 'json', // 请求数据的编码类型，选填，默认值是axios实例的配置，可选值：form | json
    headers: {}, // 选填，自定义请求头
    loading: true // 顶部loading动画，选填，默认：false
  });
}

// 接口2
function api2(data) {
  return SendHttp({
    url: 'login.php', // 接口相对地址，必填
    method: 'post',
    data,
    dataType: 'form',
    loading: false // 顶部loading动画，选填，默认：false
  });
}
// 接口3
function api3(data) {
  return SendHttp({
    url: 'register.php', // 接口相对地址，必填
    method: 'post',
    data,
    dataType: 'form',
    loading: false // 顶部loading动画，选填，默认：false
  });
}

// 并发
export function getAll(data1, data2) {
  return axios.all([api2(data1), api3(data2)]);
}
