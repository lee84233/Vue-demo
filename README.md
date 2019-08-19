# 开箱即用 - Vue前端框架

* 基于Vue Cli 3创建的Vue前端框架，适用于中小型应用、微服务应用。

----

1. 需要具有Vue，Vue Router，Vuex等基础。
2. 本项目技术栈相关文档：[Vue官网](https://cn.vuejs.org/)、[Vue Router](https://router.vuejs.org/zh/)、[Vuex](https://vuex.vuejs.org/zh/)。
3. 配置文档[Vue Cli](https://cli.vuejs.org/zh/)、[配置文档](https://cli.vuejs.org/zh/config/)。

## 1. 常用命令
```
// 安装依赖
npm install

// 运行开发环境
npm run serve

// 打包
npm run build

// 运行你的测试
npm run test
```

## 2. 目录结构
```
.
├── dist/                          // 默认的 build 输出目录
├── public/                        // 静态资源
    ├── index.html                 // index.html
    └── manifest.json              // PWA应用manifest.json文件（PWA应用需要此文件）
└── src/                           // 源码目录，可选
    ├── assets/                    // 资源目录
        ├── images                 // 图片资源目录
        ├── css                    // css资源目录
        └── lib                    // 自定义、第三方资源目录
    ├── store/                     // Vuex状态管理目录
    ├── router/                    // Vue Router路由目录
    ├── components/                // 公共组件目录
    ├── views/                     // 页面目录
        └── home.vue               // 页面vue文件
    ├── App.vue                    // 根组件
    ├── main.js                    // 入口js
    └── app.js                     // 运行时配置文件
├── vue.config.js                  // 配置文件
└── package.json                   // npm包配置文件，定义项目的npm脚本，依赖包等信息
```

## 3. HTTP请求
1. 封装`axios`实例，用于发起`Restful`请求。路径：`/src/assets/lib/axios-base.js`
2. ~~封装`Apollo`实例，用于发起`GraphQL`请求。路径：`/src/assets/lib/apollo-client.js`~~

### 3.1 发起请求
```javascript
// service/api.js 文件
import axiosBase from '@/assets/lib/axios-base';

// 基础路径
export function getBaseUrl() {
  return axiosBase.BASEURL;
}

// 注册
export function register(params) {
  return axiosBase.post('register', params);
}
// 登录
export function login(params) {
  return axiosBase.post('login', params);
}


// views/index.vue vue页面内
import {register, login} from '@/service/user'; // 1. 引入需要使用的方法
// 2. 使用
login({
  phone: '18765900190',
  password: 'admin'
}).then((response) => {
  console.log(response);
});
```

### 3.2 执行多个并发
```javascript
// service/api.js 文件
import axios from 'axios';
import axiosBase from '@/assets/lib/axios-base';

// 注册
function register(params) {
  return axiosBase.post('register', params);
}

// 登录
function login(params) {
  return axiosBase.post('login', params);
}

// 执行多个并发
export function getAll(params1, params2) {
  return axios.all([login(params1), register(params2)]);
}


// views/index.vue vue页面内
import axios from 'axios';
import {getAll} from '@/service/user'; // 1. 引入需要使用的方法
// 2. 使用
getAll().then(
  axios.spread((res1, res2) => {
    // 两个请求现在都执行完成
    console.log(res1);
    console.log(res2);
  })
);
```

## 4. 使用代理，解决开发跨域问题

```javascript
// vue.config.js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
```
