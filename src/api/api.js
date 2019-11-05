/**
 * 定义示例功能接口
 */
import request from '@/assets/utils/request-base';

// 示例接口1
export function api1(data) {
  return request({
    url: '/api1.php', // 接口相对地址，必填
    baseURL: '/api', // baseURL，选填，默认实例的配置
    method: 'post', // 请求方式，选填，默认值：get，可选值：get | post | put | delete
    data, // 入参，选填，默认：{}
    dataType: 'json', // 请求数据的编码类型，选填，默认值是axios实例的配置，可选值：form | json
    headers: {}, // 选填，自定义请求头
    loading: true // 顶部loading动画，选填，默认：false
  });
}

// 示例接口2
export function api2() {
  return request({
    url: '/list.php',
    loading: true
  });
}
