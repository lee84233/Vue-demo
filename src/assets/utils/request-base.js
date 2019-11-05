/*
 * axios 实例封装
 * 通常一个实例对应一个代理
 * 如果有多个代理，可Copy该文件，修改 OPTION 对象，来对应多个Proxy代理
 *
 * @Author: Lee
 * @Date: 2018-03-03 11:25:19
 * @Last Modified by: Lee
 * @Last Modified time: 2019-08-13 16:20:48
 */

import axios from 'axios';
import qs from 'qs';
import app from '@/main';

/**
 * Request基本参数
 */
const OPTION = {
  // 接口基础路径和配置代理的路径
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_URL,
  // 超时时间
  timeout: 30000,
  // 请求头
  // 请求头信息中不能出现中文
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // form data格式
    'Content-Type': 'application/json;charset=UTF-8' // json格式
  }
};

// Axios实例
const AXIOS_BASE = axios.create(OPTION);

// 请求拦截器
AXIOS_BASE.interceptors.request.use(
  (config) => {
    // 在发送请求之前处理
    // headers添加token
    if (app.$store.state.token) {
      config.headers.Authorization = app.$store.state.token;
    }
    return config;
  },
  // 对请求错误处理
  (error) => Promise.reject(error)
);

// 响应拦截器
AXIOS_BASE.interceptors.response.use(
  // 对响应数据处理
  (response) => response,
  (error) => {
    // 对响应错误处理
    if (error.message.includes('timeout')) {
      error.message = '请求超时';
    }

    if (error && error.response) {
      /* eslint-disable */
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未登录或登录超时，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错：${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 413:
          error.message = '解析失败';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          error.message = '请求错误';
      }
      /* eslint-enable */
    }
    console.error(`错误信息：${error.message}`); // eslint-disable-line
    return Promise.reject(error);
  }
);

/**
 * 对POST、PUT请求，参数格式化
 *
 * @param {Object} data：参数
 * @returns {Object} 格式化后的参数类型
 */
/**
 * 对POST、PUT请求，参数格式化
 * @param {Object} data：需要格式化的对象
 * @param {*} dataType：form | json
 * @returns
 */
function formatParams(data, dataType) {
  // dataType 优先级最高
  if (dataType === 'form') {
    data = qsStringify(data);
    return data;
  } else if (dataType === 'json') {
    return data;
  }

  // axios全局配置 优先级次之
  if (
    OPTION &&
    OPTION['headers'] &&
    OPTION['headers']['Content-Type'] &&
    OPTION['headers']['Content-Type'].includes(
      'application/x-www-form-urlencoded'
    )
  ) {
    data = qsStringify(data);
  }
  return data;
}

/**
 * 参数转换为Form Data格式
 * 使用QS插件
 *
 * @param {Object} data
 * @returns Form Data
 */
function qsStringify(data) {
  data = qs.stringify(data, {
    encode: false
  });
  return data;
}

/**
 * axios请求
 * @param {Object} object：options
 * @returns {Promise} Promise
 */
export default async function({
  baseURL = null,
  url,
  method = 'get',
  data = {},
  dataType = '',
  headers = {},
  loading = false
}) {
  loading === true && app.$Progress.start();
  method = method.toLowerCase(); // 请求方法
  let params = {}; // 与请求一起发送的 URL 参数

  // Content-Type
  let contentType = headers['Content-Type'] || headers['content-type'] || headers['Content-type'] || headers['content-Type'] || null;
  if (contentType) {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      dataType = 'form';
    } else if (contentType.includes('application/json')) {
      dataType = 'json';
    }
  }

  // 设置请求头的编码类型
  if (dataType === 'form') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  } else if (dataType === 'json') {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
  }

  // 请求参数
  if (['get', 'delete'].includes(method)) {
    params = data;
    data = {};
  } else if (['post', 'put', 'patch'].includes(method)) {
    data = formatParams(data, dataType);
  } else {
    console.error(`${url}接口请求方法错误：${method}`); // eslint-disable-line
    return;
  }

  // request 参数
  let option = {
    url,
    method,
    params,
    data,
    headers
  };

  // baseURL
  baseURL && (option.baseURL = baseURL);

  return new Promise((resolve, reject) => {
    AXIOS_BASE.request(option)
      .then(
        (response) => {
          loading === true && app.$Progress.finish();
          resolve(response.data);
        },
        (error) => {
          loading === true && app.$Progress.fail();
          reject(error);
        }
      )
      .catch((error) => {
        loading === true && app.$Progress.fail();
        reject(error);
      });
  });
}
