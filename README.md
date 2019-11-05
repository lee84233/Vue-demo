# 开箱即用 - Vue前端框架

1. 基于 `Vue 2.x`、`Vue Cli 4.x` 完善的Vue前端框架
2. [Vue官网、文档](https://cn.vuejs.org/)
3. 核心插件：[Vue路由](https://router.vuejs.org/zh/)、[Vuex状态管理](https://vuex.vuejs.org/zh/)
4. 工具：[Vue Cli](https://cli.vuejs.org/zh/)、[Vue-Devtools](https://github.com/vuejs/vue-devtools)

## 1. 常用命令
```
// 安装Vue Cli
npm install -g @vue/cli
# 或者
yarn global add @vue/cli

// 安装依赖
npm install

// 运行开发环境
npm run serve

// 打包 - 测试环境
// 详情参考环境变量
npm run build:testing

// 打包 - 生产环境
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
    └── favicon.ico                // favicon图标
    └── manifest.json              // *PWA应用manifest.json文件（PWA应用需要此文件）
    └── ...                        // 其他不需要webpack处理的资源（如第三方插件），你需要通过绝对路径来引用它们
└── src/                           // 源代码
    ├── assets/                    // 样式、图片、公用方法和插件等静态资源
        ├── css                    // 样式
        ├── images                 // 图片
        ├── icons                  // svg图标
        ├── utils                  // 公用方法
        └── plugins                // 插件
    ├── store/                     // Vuex状态管理
    ├── router/                    // 路由
    ├── api/                       // 所有接口请求
    ├── components/                // 组件
    ├── views/                     // 页面目录
        ├── layout                 // Layout布局文件
        └── ...                    // 其他vue文件
    ├── App.vue                    // 根组件
    └── main.js                    // 入口js
├── vue.config.js                  // vue-cli 配置
├── .env.xxx                       // 环境变量配置
├── .eslintrc.js                   // Eslint配置
├── .env.production                // 生产环境文件
└── package.json                   // npm包配置文件，定义项目的npm脚本，依赖包等信息
```

## 3. HTTP请求

1. 封装`axios`实例，用于发起`Restful`请求。路径：`/src/assets/utils/request-base.js`
2. ~~封装`Apollo`实例，用于发起`GraphQL`请求。路径：`/src/assets/js/apollo-client.js`~~

## 3.1 参数说明

1. `url`：**唯一的必填属性**，接口相对地址
2. `baseURL`：基础URL，默认值：实例的配置，选填，通常在实例中配置即可
3. `method`：请求方式，可选值：get | post | put | delete，默认值：get，选填
4. `data`：请求参数，默认值：{}，选填
5. `dataType`：请求的编码类型，可选值：json | form，默认值：实例的配置，选填，通常在实例中配置即可
6. `headers`：请求头，默认值：{}，选填
7. `loading`：顶部Loading动画，可选值：true | false，默认值：false，选填

### 3.2 发起请求
```javascript
/**
 * 文件：service/user.js
 */
// 引入axios实例
import request from '@/assets/utils/request-base';
// 定义接口：登录
export function login(data) {
  return request({
    url: 'login.php',
    method: 'post',
    data,
    dataType: 'json',
    loading: true
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

### 3.3 执行多个并发（同时发起多个请求）
```javascript
/**
 * 文件：service/user.js
 */
// 引入axios、axios实例
import axios from 'axios';
import request from '@/assets/utils/request-base';
// 定义接口：测试接口2
function api2(data) {
  return request({
    url: 'test2.php', // 接口相对地址，必填
    data
  });
}
// 定义接口：测试接口3
function api3(data) {
  return request({
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
getAll({param: 'a'}, {param: 'b'}).then(
  axios.spread((response1, response2) => {
    // 两个请求现在都执行完成
    console.log(response1);
    console.log(response2);
  })
);
```

## 4. 跨域

### 4.1 开发环境，使用webpack的 `proxy` 解决跨域
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

### 4.2 生产环境解决跨域

1. `CORS`：一劳永逸的解决跨域问题，而且不管是开发环境还是正式环境都能方便的使用。详细[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
2. 服务器（如：`nginx`、`node`等）配置反向代理。
3. 前端打包后复制到后台 `webapp` 中，和后台同源部署，避免跨域。


## 5. 使用Webpack全局引入插件

### 5.1 示例：全局引入 `jquery`

```
// 需要安装webpack，项目已安装则忽略
npm install --save-dev webpack

// 安装依赖
npm install --save jquery

// vue.config.js文件
const webpack = require('webpack');
module.exports = {
  // 配置 webpack，会合并到最终的配置中
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        ...
      })
    ]
  }
};

```

## 6. 国际化

> 插件文档：https://kazupon.github.io/vue-i18n/

1. 安装依赖 `npm install --save vue-i18n`
2. `main.js` 引入i18n插件
3. 插件使用见 `/src/assets/plugins/lang/index.js`

```javascript
// main.js
// 国际化
import i18n from '@/assets/plugins/lang/index';

export default new Vue({
  i18n,
  render: (h) => h(App)
}).$mount('#app');
```

## 7. 安装 `Element UI` 框架

1. 安装Vue CLI，`npm install -g @vue/cli`（如已安装，可忽略本步骤）
2. 添加依赖 `vue add element`
3. main.js文件添加全局依赖 `import '@/assets/plugins/element';`

**注：**执行`vue add element`，插件会自动修改`App.vue`，注意保存文件！！！

## 8. 支持 `svg` 扩展

### 8.1 使用

> 支持和推荐单独导出 svg 的引入使用方式

1. [iconfont.cn](https://www.iconfont.cn) 网站选择要使用的图标，并下载 `svg` 到 `/src/assets/icons/svg/` 目录下
2. 页面使用全局组件 `svg-icon`

```
// icon-name 为 图标的名字，必填
// class-name 为 组件的class，选填
<svg-icon class-name="icon-styles" icon-class="password" />
```

### 8.2 修改颜色

1. 下载的 `svg` 如果定义样式无法修改颜色，可尝试编辑 `*.svg` 文件，删除文件所有的 `fill` 属性。
