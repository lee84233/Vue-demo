# 开箱即用 - Vue前端框架

* 基于Vue Cli 3创建的Vue前端框架，适用于中小型应用、微服务应用。

----

1. 需要具有Vue，Vue Router，Vuex等基础。
2. 本项目技术栈相关文档：[Vue官网](https://cn.vuejs.org/)、[Vue Router](https://router.vuejs.org/zh/)、[Vuex](https://vuex.vuejs.org/zh/)。
3. 指南和配置文档：[Vue Cli](https://cli.vuejs.org/zh/)、[配置文档](https://cli.vuejs.org/zh/config/)。

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
    └── ...                        // 其他不需要webpack处理的资源（如第三方插件），你需要通过绝对路径来引用它们
└── src/                           // 源码目录，可选
    ├── assets/                    // 静态资源目录
        ├── images                 // 图片资源目录
        ├── css                    // css资源目录
        ├── js                     // js资源目录
        └── lang                   // 国际化资源目录
    ├── store/                     // Vuex状态管理目录
    ├── router/                    // Vue Router路由目录
    ├── service/                   // 接口文档
    ├── components/                // 组件目录
    ├── views/                     // 页面目录
        ├── layout                 // Layout布局文件
        └── ...                    // 其他vue文件
    ├── App.vue                    // 根组件
    └── main.js                    // 入口js
├── vue.config.js                  // 配置文件
├── .env.development               // 开发环境文件
├── .env.production                // 生产环境文件
└── package.json                   // npm包配置文件，定义项目的npm脚本，依赖包等信息
```

## 3. HTTP请求
1. 封装`axios`实例，用于发起`Restful`请求。路径：`/src/assets/js/axios-interface.js`
2. ~~封装`Apollo`实例，用于发起`GraphQL`请求。路径：`/src/assets/js/apollo-client.js`~~


### 3.1 发起请求
```javascript
/**
 * 文件：service/user.js
 */
// 引入axios实例
import SendHttp from '@/assets/js/axios-interface';
// 定义接口：登录
export function login(data) {
  return SendHttp({
    url: 'login.php', // 必填，接口相对地址
    method: 'post', // 选填，请求方式，默认值：get，可选值：get | post | put | delete
    data, // 选填，请求参数，默认：{}
    dataType: 'json', // 选填，请求数据的编码类型，默认值是axios实例的配置，可选值：form | json
    headers: {}, // 选填，自定义请求头
    loading: true // 选填，发起请求时loading动画，默认：false，可选值：true | false
  });
}


/**
 * vue页面
 */
import { login } from '@/service/user'; // 1. 引入需要使用的方法
// 2. 使用
login({
  phone: '18765900190',
  password: 'admin'
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});
```

### 3.2 执行多个并发（同时发起多个请求）
```javascript
/**
 * 文件：service/user.js
 */
// 引入axios、axios实例
import axios from 'axios';
import SendHttp from '@/assets/js/axios-interface';
// 定义接口：测试接口2
function api2(data) {
  return SendHttp({
    url: 'test2.php', // 接口相对地址，必填
    data
  });
}
// 定义接口：测试接口3
function api3(data) {
  return SendHttp({
    url: 'test3.php', // 接口相对地址，必填
    data
  });
}
// 导出接口
export function getAll(data1, data2) {
  return axios.all([api2(data1), api3(data2)]);
}


/**
 * vue页面
 */
import axios from 'axios';
import {getAll} from '@/service/user'; // 1. 引入需要使用的方法
// 2. 使用
getAll({}, {}).then(
  axios.spread((response1, response2) => {
    // 两个请求现在都执行完成
    console.log(response1);
    console.log(response2);
  })
);
```

## 4. 使用代理，解决开发跨域问题

```
      https://example.com:80/interface/menu/getMentList
      \____________________/\________/\_______________/
                |               |             |     
              proxy          context         path

proxy：代理域名，在`proxy`中配置
context：上下文，在`axois实例`和`proxy`属性中，分别配置。(上下文可以是自定义)
path：路径，在定义接口时配置
```

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
